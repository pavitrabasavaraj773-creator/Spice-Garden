// Razorpay Payment Gateway Integration

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayCheckoutParams {
  amount: number; // in INR rupees (will be converted to paise)
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  description?: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

// Default standard Razorpay Test Key for instant prototyping if custom key is not supplied in env
export const DEFAULT_RAZORPAY_KEY =
  import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag';

/**
 * Dynamically loads the Razorpay Standard Checkout SDK script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay Checkout SDK script.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Initiates standard Razorpay modal checkout popup
 */
export async function openRazorpayCheckout(params: RazorpayCheckoutParams): Promise<boolean> {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !(window as any).Razorpay) {
    if (params.onError) {
      params.onError(new Error('Razorpay SDK could not be loaded. Please check your internet connection.'));
    }
    return false;
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || DEFAULT_RAZORPAY_KEY;

  const options = {
    key: razorpayKey,
    amount: Math.round(params.amount * 100), // Amount in paise (1 INR = 100 paise)
    currency: 'INR',
    name: 'Spice Garden Restaurant',
    description: params.description || `Order #${params.orderId} - Spice Garden Hubballi`,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80',
    prefill: {
      name: params.customerName || '',
      contact: params.customerPhone ? params.customerPhone.replace(/[^0-9]/g, '') : '',
      email: params.customerEmail || 'orders@spicegardenhubballi.com',
    },
    notes: {
      order_id: params.orderId,
      restaurant: 'Spice Garden, Gokul Road, Hubballi',
    },
    theme: {
      color: '#3D2B1F', // Brand primary dark tone
      backdrop_color: '#3D2B1F',
    },
    handler: function (response: RazorpayPaymentSuccessResponse) {
      params.onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        if (params.onDismiss) {
          params.onDismiss();
        }
      },
      confirm_close: true,
      animation: true,
    },
  };

  try {
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Razorpay Payment Failed:', response.error);
      if (params.onError) {
        params.onError(response.error);
      }
    });
    rzp.open();
    return true;
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    if (params.onError) {
      params.onError(error);
    }
    return false;
  }
}
