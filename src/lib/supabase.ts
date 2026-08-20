import { createClient } from '@supabase/supabase-js';
import { ReservationConfirmation, PlacedOrder } from '../types';

const SUPABASE_PROJECT_ID = 'kidxpaccsmankylxarzt';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ggkIpSArBOk6UjC5Op3dxQ_hI9SQh6G';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseReservationRecord {
  booking_id: string;
  full_name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seating_area: string;
  occasion?: string;
  special_requests?: string;
  status: string;
  created_at?: string;
}

/**
 * Saves a table reservation directly to the connected Supabase database
 */
export async function saveReservationToSupabase(reservation: ReservationConfirmation): Promise<{
  success: boolean;
  error?: string;
  tableName?: string;
}> {
  const record: SupabaseReservationRecord = {
    booking_id: reservation.bookingId,
    full_name: reservation.fullName,
    phone: reservation.phone,
    email: reservation.email,
    guests: reservation.guests,
    date: reservation.date,
    time: reservation.time,
    seating_area: reservation.seatingArea,
    occasion: reservation.occasion || 'None',
    special_requests: reservation.specialRequests || '',
    status: reservation.status || 'Confirmed',
    created_at: new Date().toISOString()
  };

  try {
    // Attempt insert into 'reservations' table
    const { error: primaryError } = await supabase
      .from('reservations')
      .insert([record]);

    if (!primaryError) {
      return { success: true, tableName: 'reservations' };
    }

    // If 'reservations' failed with table not found (42P01), try fallback table names 'bookings' or 'table_bookings'
    if (primaryError.message?.toLowerCase().includes('relation') || primaryError.code === '42P01') {
      const { error: fallbackError1 } = await supabase
        .from('bookings')
        .insert([record]);

      if (!fallbackError1) {
        return { success: true, tableName: 'bookings' };
      }

      const { error: fallbackError2 } = await supabase
        .from('table_bookings')
        .insert([record]);

      if (!fallbackError2) {
        return { success: true, tableName: 'table_bookings' };
      }
    }

    console.warn('Supabase reservation insert warning:', primaryError.message);
    return { success: false, error: primaryError.message };
  } catch (err: any) {
    console.error('Error saving reservation to Supabase:', err);
    return { success: false, error: err?.message || 'Connection error' };
  }
}

/**
 * Saves an online dining order to Supabase
 */
export async function saveOrderToSupabase(order: PlacedOrder): Promise<{
  success: boolean;
  error?: string;
  tableName?: string;
}> {
  const record = {
    order_id: order.orderId,
    customer_name: order.customerDetails.customerName,
    phone: order.customerDetails.phone,
    delivery_type: order.customerDetails.deliveryType,
    delivery_address: order.customerDetails.deliveryAddress || '',
    table_number: order.customerDetails.tableNumber || '',
    notes: order.customerDetails.notes || '',
    payment_method: order.customerDetails.paymentMethod,
    payment_id: order.paymentId || '',
    payment_status: order.paymentStatus || (order.customerDetails.paymentMethod === 'razorpay_online' ? 'Paid' : 'Pending'),
    subtotal: order.subtotal,
    discount: order.discount,
    gst: order.gst,
    delivery_fee: order.deliveryFee,
    total: order.total,
    items: JSON.stringify(order.items),
    status: 'Received',
    created_at: new Date().toISOString()
  };

  try {
    const { error } = await supabase.from('orders').insert([record]);
    if (!error) return { success: true, tableName: 'orders' };

    // Fallback try dining_orders
    const { error: fallbackError } = await supabase.from('dining_orders').insert([record]);
    if (!fallbackError) return { success: true, tableName: 'dining_orders' };

    return { success: false, error: error.message };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

/**
 * Helper to fetch existing reservations if needed
 */
export async function fetchReservationsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Fallback try 'bookings'
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      return bookingsData || [];
    }
    return data || [];
  } catch (err) {
    console.error('Error fetching reservations:', err);
    return [];
  }
}

