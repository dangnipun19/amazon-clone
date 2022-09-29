const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req,res) =>{
    const {items,email} = req.body;
    
    const transformedItems = items?.map((item)=>({
        quantity:1,
        price_data:{
            currency:'inr',
            unit_amount:Math.floor(item.price*78)*100,
            product_data:{
                name:item.title,
                images:[item.image],
                // description:item.description,
                
            },

        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA','IN'],
          },
        shipping_options:[
            {
                shipping_rate_data:{
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 10000,
                      currency: 'inr',
                    },
                    display_name: 'Next-Day-Shipping',
                    delivery_estimate: {
                        minimum: {
                          unit: 'business_day',
                          value: 1,
                        },
                        maximum: {
                          unit: 'business_day',
                          value: 3,
                        },
                }
            }
        }
        ],
        // shipping_rates:['shr_1LeituSJVScl1fQRU5DXS4N5'],
        // shipping_address_collection:{
        //     allowed_countries:['IN','GB','US']
        // },
        line_items:transformedItems,
        mode:'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}/checkout`,
        metadata:{
            email,
            images: JSON.stringify(items.map((item)=>item.image))
        }
    })
    res.status(200).json({id:session.id})
}
// whsec_3a3a558fa163ad8631ab5bec2b0fc025ac5fc40d7da505e7f5458866014e7e8d