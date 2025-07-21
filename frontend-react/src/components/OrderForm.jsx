import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../styles/OrderForm.css';
import { useParams } from 'react-router-dom';

export default function OrderForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            status: 'NEW',
            predictedPrice: 0,
            estimatedFabricationTime: '',
            totalAmount: 0,
            quantity: 1,
            thickness: 0,
            height: 0,
            width: 0,
            weight: 0,
            textPaperType: '',
            coverFinishType: '',
            bindingType: '',
            shippingMethod: '',
            deliveryLocation: '',
            expectedDate: ''
        }
    });
    const { id } = useParams(); // <-- gets order ID from URL

    const [loadingPrediction, setLoadingPrediction] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [apiError, setApiError] = useState(null);

    const watchedFields = watch([
        'quantity', 'thickness', 'height', 'width', 'weight',
        'textPaperType', 'coverFinishType', 'bindingType'
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const [
                quantity, thickness, height, width, weight,
                textPaperType, coverFinishType, bindingType
            ] = watchedFields;

            const readyForPrediction =
                quantity > 0 && thickness >= 0 && height >= 0 && width >= 0 &&
                weight >= 0 && textPaperType && coverFinishType && bindingType;

            if (readyForPrediction) {
                fetchPrediction({
                    quantity,
                    thickness,
                    height,
                    width,
                    weight,
                    text_paper_type: textPaperType,
                    cover_finish_type: coverFinishType,
                    binding_type: bindingType
                });
            } else {
                setValue('predictedPrice', 0);
                setValue('estimatedFabricationTime', '');
                setValue('totalAmount', 0);
            }
        }, 700);

        return () => clearTimeout(timer);
    }, [watchedFields]);

    const fetchPrediction = async (inputData) => {
        try {
            setApiError(null);
            setLoadingPrediction(true);
            const { data } = await axios.post('http://localhost:5000/predict', inputData);

            const predictedPrice = data.predictedPrice;
            const estimatedTime = data.estimatedFabricationTime;
            const quantity = Number(inputData.quantity);

            const calculatedTotal = Number((predictedPrice * quantity).toFixed(2));

            setValue('predictedPrice', predictedPrice);
            setValue('estimatedFabricationTime', estimatedTime);
            setValue('totalAmount', calculatedTotal);
        } catch (error) {
            console.error("Prediction Error:", error);
            setApiError('Failed to fetch price prediction.');
            setValue('predictedPrice', 0);
            setValue('estimatedFabricationTime', '');
            setValue('totalAmount', 0);
        } finally {
            setLoadingPrediction(false);
        }
    };

    const onSubmit = async (data) => {
        setApiError(null);
        setLoadingSubmit(true);
        try {
            if (id) {
                // Update mode
                const res = await axios.put(`http://localhost:8081/orders/${id}`, data);
                alert('✅ Order updated successfully!');
                console.log('Order updated:', res.data);
            } else {
                // Create mode
                const res = await axios.post('http://localhost:8081/orders', data);
                alert('✅ Order created successfully!');
                console.log('Order created:', res.data);
            }
        } catch (error) {
            console.error("Order submission error:", error);
            setApiError('❌ Failed to submit order. Please try again.');
        } finally {
            setLoadingSubmit(false);
        }
    };
    return (
        <div className="order-form">
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('status')} />

                {/* Shipping Method */}
                <div className="form-group">
                    <label htmlFor="shippingMethod">Shipping Method</label>
                    <select id="shippingMethod" {...register('shippingMethod', { required: true })}>
                        <option value="">Select a shipping method</option>
                        <option value="FEDEX">FedEx</option>
                        <option value="DHL">DHL</option>
                    </select>
                    {errors.shippingMethod && <p className="error-message">Shipping method is required</p>}
                </div>

                {/* Delivery Location */}
                <div className="form-group">
                    <label htmlFor="deliveryLocation">Delivery Address</label>
                    <input id="deliveryLocation" type="text" placeholder="123 Main St"
                           {...register('deliveryLocation', { required: true })} />
                    {errors.deliveryLocation && <p className="error-message">Address is required</p>}
                </div>

                {/* Expected Delivery Date */}
                <div className="form-group">
                    <label htmlFor="expectedDate">Expected Delivery Date</label>
                    <input id="expectedDate" type="date" {...register('expectedDate', { required: true })} />
                    {errors.expectedDate && <p className="error-message">Expected date is required</p>}
                </div>

                {/* Quantity */}
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input id="quantity" type="number" min="1" {...register('quantity', { required: true, min: 1 })} />
                    {errors.quantity && <p className="error-message">Must be at least 1</p>}
                </div>

                {/* Thickness */}
                <div className="form-group">
                    <label htmlFor="thickness">Thickness</label>
                    <input id="thickness" type="number" step="0.01" min="0"
                           {...register('thickness', { required: true, min: 0 })} />
                    {errors.thickness && <p className="error-message">Must be ≥ 0</p>}
                </div>

                {/* Height */}
                <div className="form-group">
                    <label htmlFor="height">Height</label>
                    <input id="height" type="number" step="0.01" min="0"
                           {...register('height', { required: true, min: 0 })} />
                    {errors.height && <p className="error-message">Must be ≥ 0</p>}
                </div>

                {/* Width */}
                <div className="form-group">
                    <label htmlFor="width">Width</label>
                    <input id="width" type="number" step="0.01" min="0"
                           {...register('width', { required: true, min: 0 })} />
                    {errors.width && <p className="error-message">Must be ≥ 0</p>}
                </div>

                {/* Weight */}
                <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" type="number" step="0.01" min="0"
                           {...register('weight', { required: true, min: 0 })} />
                    {errors.weight && <p className="error-message">Must be ≥ 0</p>}
                </div>

                {/* Text Paper Type */}
                <div className="form-group">
                    <label htmlFor="textPaperType">Text Paper Type</label>
                    <select id="textPaperType" {...register('textPaperType', { required: true })}>
                        <option value="">Select...</option>
                        <option value="OFFSET">OFFSET</option>
                        <option value="GLOSSY">GLOSSY</option>
                        <option value="MATTE">MATTE</option>
                    </select>
                    {errors.textPaperType && <p className="error-message">Required</p>}
                </div>

                {/* Cover Finish Type */}
                <div className="form-group">
                    <label htmlFor="coverFinishType">Cover Finish Type</label>
                    <select id="coverFinishType" {...register('coverFinishType', { required: true })}>
                        <option value="">Select...</option>
                        <option value="GLOSSY">GLOSSY</option>
                        <option value="MATTE">MATTE</option>
                        <option value="LAYFLAT-GLOSS">LAYFLAT-GLOSS</option>
                    </select>
                    {errors.coverFinishType && <p className="error-message">Required</p>}
                </div>

                {/* Binding Type */}
                <div className="form-group">
                    <label htmlFor="bindingType">Binding Type</label>
                    <select id="bindingType" {...register('bindingType', { required: true })}>
                        <option value="">Select...</option>
                        <option value="CASEBIND">CASEBIND</option>
                        <option value="SPIRAL">SPIRAL</option>
                        <option value="STAPLED">STAPLED</option>
                    </select>
                    {errors.bindingType && <p className="error-message">Required</p>}
                </div>

                {/* Total Amount */}
                <div className="form-group">
                    <label>Total Amount</label>
                    <input type="number" step="0.01" {...register('totalAmount')} readOnly />
                </div>

                {/* Predicted Price */}
                <div className="form-group">
                    <label>Predicted Price</label>
                    <input type="number" step="0.01" {...register('predictedPrice')} readOnly />
                </div>

                {/* Estimated Fabrication Time */}
                <div className="form-group">
                    <label>Estimated Fabrication Time</label>
                    <input type="text" {...register('estimatedFabricationTime')} readOnly />
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <Button type="submit" label={loadingSubmit ? 'Submitting...' : 'Create Order'} disabled={loadingSubmit} />
                </div>

                {/* Error Message */}
                {apiError && <p className="error-message">{apiError}</p>}
            </form>
        </div>
    );
}
