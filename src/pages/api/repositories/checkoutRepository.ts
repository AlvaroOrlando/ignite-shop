import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async (cartItems:any[]) => {
  const lineItems = cartItems.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency:'BRL',
      unit_amount: item.price,
      product_data: {
        name: item.name,
        description: item.description, 
        images: [item.imageUrl],
      },
    },
    
  }));

  try {

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_URL}/`,
      mode: 'payment',
      line_items: lineItems,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};


