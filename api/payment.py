import simplify

simplify.public_key = 
simplify.private_key = 

payment = simplify.Payment.create({
    "amount": "[amount]",
    "token" : "[TOKEN ID]",
    "description" : "Donation to Gitr",
    "reference" : "7a6ef6be31",
    "currency" : "USD"
})

if payment.paymentStatus == 'APPROVED':
    print "Payment approved"
