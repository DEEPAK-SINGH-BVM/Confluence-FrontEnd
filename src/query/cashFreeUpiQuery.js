export const createOrderForOrganization = `
    mutation CashFreeMutation(
        $customer_id:String!,
        $customer_email:String!,
        $customer_phone:String!,
        $amount:String!,
        $plan:String!
    ) {
          createOrder(customer_id:$customer_id,customer_email:$customer_email,customer_phone:$customer_phone,amount:$amount, plan:$plan){
            session_id
          }
    }
`;

export const orderPayUrl = `
    mutation orderPayUrlMutation(
        $upi_id:String!,
        $session_id:String!
    ) {
          orderPay(upi_id:$upi_id,session_id:$session_id){
            url
          }
    }
`;
    
export const checkOrderStatus = `
    mutation checkOrderStatusMutation(
        $order_id:String!
    ) {
          getOrderPaymentStatus(order_id:$order_id){
            status
          }
    }
`;
