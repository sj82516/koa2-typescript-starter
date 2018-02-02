import * as mongoose from "mongoose";
import { map } from "bluebird";
import { IOptions } from "cookies";

export interface IOrder{
    email?: string,
    user: mongoose.Types.ObjectId,
    address?: string,
    name?: string,
    phone?: string,
    log_id: string,
    result?: string,
    memo?: string,
    _id: any
}

// UserDocument is for mongoose purposed.
// You can add fields which generate by mongoose middlewear.
interface OrderDocument extends mongoose.Document, IOrder{}

const OrderSchema = new mongoose.Schema({
    name: String,
    user: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    address: String,
    // 收貨人
    phone: String,
    log_id: String,
    memo: String,
    result: String,
},  {timestamps: true} )

// Singleton pattern
export class OrderModel {
    private static instance: OrderModel
    private _orderModel: mongoose.Model<OrderDocument>

    private constructor(){
        this._orderModel = mongoose.model<OrderDocument>("order", OrderSchema, "orders", true);
    }

    static getInstance() {
        if (!OrderModel.instance) {
            OrderModel.instance = new OrderModel();
        }
        return OrderModel.instance;
    }

    create(order: IOrder): Promise<IOrder>{
        // need to delete nor the _id would be strange
        delete order._id
        return this._orderModel.create(order)
    }

    async update(order: {
        log_id: string,
        user_id: string,
        result: string,
        name?: string,
        phone?: string,
        memo?: string,
        address?: string,
    }): Promise<IOrder>{
        let newOrder =  await this._orderModel.findOneAndUpdate({
            log_id: order.log_id,
            user: order.user_id
        }, {
            $set: {
                result: order.result,
                name: order.name,
                address: order.address, 
                phone: order.phone, 
                memo: order.memo, 
            }
        });
        return newOrder;
    }
}
