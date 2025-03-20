import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Track Name is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true, 'Track Price is required'],
        min:0,
    },
    currency:{
        type:String,
        enum:['USD','EUR','VND'],
        default: 'VND',
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly', 'yearly'],
    },
    category:{
        type:String,
        enum:['Entertainment','Film', 'investment', 'debt'],
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator: (value)=> value <= new Date(),
            message: 'Start Date must be in the part',
        },
    },
    reneWalDate:{
        type:Date,
        validate:{
            validator: function(value){
                value > this.startDate();
            },
            message: 'Renewal Date'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index: true,
    },
}, {timestamps: true});

trackSchema.pre('save', function(next){
    if(!this.reneWalDate){
        const reneWalDatePeriods = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        }

        this.reneWalDate = new Date(this.startDate);
        this.reneWalDate.setDate(this.reneWalDate.getDate() + reneWalDatePeriods[this.frequency]);
    }

    if(this.reneWalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const Track = mongoose.model('Track', trackSchema);
export default Track;