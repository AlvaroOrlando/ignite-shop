import Stripe from "stripe"

const apiKey = process.env.STRIPE_SECRET_KEY

if (!apiKey) {
    throw new Error("A variável de ambiente STRIPE_SECRET_KEY não está definida.");
}

export const stripe = new Stripe(apiKey, {
    apiVersion: "2023-10-16",
    appInfo:{
        name:'Ignite Shop'
    }
})