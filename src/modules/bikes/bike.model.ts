import { model, Schema } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema<IBike>(
  { image: { type: String, trim: true, required: [true, 'Image is Required'] },
    name: { type: String, trim: true, required: [true, 'Name is Required'] },
    brand: {
      type: String,
      trim: true,
      required: [true, 'Brand name is Required!!'],
    },
    price: {
      type: Number,
      min: [0, 't can not be less than 0 '],
      required: [true, 'Bike price is Required '],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: '{VALUE} is not a valid category',
      },
    },
    model: {
      type: String,
      trim: true,
      required: [true, 'Bike model is Required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Bike Description is Required'],
    },
    quantity: {
      type: Number,
      min: [0, 'quantity can not be less than 0 '],
      required: [true, 'Quantity of the bike Required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock value will be true or false'],
      default: true,
    },
  },
  {
    // it automatic add two field 1.updatedAt 2.createdAt
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // Exclude the __v field
        delete ret.__v;
      },
    },
  },
);

const Bike = model<IBike>('Bike', bikeSchema);
export default Bike;
