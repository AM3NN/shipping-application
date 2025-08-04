import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/OrderForm.css';

// Mappings for form values to CSV values
const paperTypeMapping = {
    OFFSET: '70#OFFSET',
    GLOSSY: '80_GlossText',
    MATTE: 'Letsgo matte 90GSM',
};

const bindingTypeMapping = {
    CASEBIND: 'CASEBIND',
    SPIRAL: 'COILSOFT',
    STAPLED: 'SS',
};

const textColorMapping = {
    '1/1': '1/1',
    '4/4': '4/4',
};

const OrderForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        defaultValues: {
            status: 'NEW',
            predictedPrice: 0,
            estimatedFabricationTime: '',
            totalAmount: 0,
            quantity: 1,
            production_page: 1,
            thickness: 0,
            height: 0,
            width: 0,
            weight: 0,
            textPaperType: '',
            coverFinishType: '',
            bindingType: '',
            textColor: '',
            shrinkwrap: false,
            three_hole_drill: false,
            perf: false,
            shippingMethod: '',
            deliveryLocation: '',
            expectedDate: '',
        },
    });
    const { id } = useParams();

    const [loadingPrediction, setLoadingPrediction] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(!!id);
    const [apiError, setApiError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(!!id);
    const toast = useRef(null);

    const today = new Date().toISOString().split('T')[0];

    // Fetch existing order data
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const fetchOrder = async () => {
                try {
                    setLoadingOrder(true);
                    const response = await axios.get(`http://localhost:8081/orders/${id}`);
                    console.log('API Response:', response.data);
                    const reverseBindingTypeMap = Object.fromEntries(
                        Object.entries(bindingTypeMapping).map(([k, v]) => [v, k])
                    );
                    const reverseTextColorMap = Object.fromEntries(
                        Object.entries(textColorMapping).map(([k, v]) => [v, k])
                    );
                    const orderData = {
                        status: response.data.status || 'NEW',
                        predictedPrice: Number(response.data.predictedPrice) || 0,
                        estimatedFabricationTime: response.data.estimatedFabricationTime || '',
                        totalAmount: Number(response.data.totalAmount) || 0,
                        quantity: Number(response.data.quantity) || 1,
                        production_page: Number(response.data.production_page) || 1,
                        thickness: Number(response.data.thickness) || 0,
                        height: Number(response.data.height) || 0,
                        width: Number(response.data.width) || 0,
                        weight: Number(response.data.weight) || 0,
                        textPaperType:
                            Object.keys(paperTypeMapping).find(
                                (key) => paperTypeMapping[key] === response.data.textPaperType
                            ) || response.data.textPaperType || '',
                        coverFinishType: response.data.coverFinishType || '',
                        bindingType:
                            reverseBindingTypeMap[response.data.bindingType] ||
                            response.data.bindingType ||
                            '',
                        textColor:
                            reverseTextColorMap[response.data.text_color] ||
                            response.data.text_color ||
                            '',
                        shrinkwrap: !!Number(response.data.shrinkwrap),
                        three_hole_drill: !!Number(response.data.three_hole_drill),
                        perf: !!Number(response.data.perf),
                        shippingMethod: response.data.shippingMethod || '',
                        deliveryLocation: response.data.deliveryLocation || '',
                        expectedDate: response.data.expectedDate?.split('T')[0] || '',
                    };
                    console.log('Mapped Order Data:', orderData);
                    reset(orderData);
                } catch (error) {
                    console.error('Error fetching order:', error);
                    setApiError('Failed to load order data.');
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load order data.',
                        life: 3000,
                    });
                } finally {
                    setLoadingOrder(false);
                }
            };
            fetchOrder();
        }
    }, [id, reset]);

    // Watch form fields for dynamic updates
    const {
        quantity,
        production_page,
        thickness,
        height,
        width,
        weight,
        textPaperType,
        coverFinishType,
        bindingType,
        textColor,
        shrinkwrap,
        three_hole_drill,
        perf,
    } = watch();

    // Debounce utility
    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // Fetch prediction
    const fetchPrediction = useCallback(
        async (inputData) => {
            try {
                setApiError(null);
                setLoadingPrediction(true);
                const mappedPaperType =
                    paperTypeMapping[inputData.textPaperType] || inputData.textPaperType;
                const mappedBindingType =
                    bindingTypeMapping[inputData.bindingType] || inputData.bindingType;
                const mappedTextColor =
                    textColorMapping[inputData.textColor] || inputData.textColor;
                console.log('Sending prediction request:', {
                    ...inputData,
                    textPaperType: mappedPaperType,
                    bindingType: mappedBindingType,
                    textColor: mappedTextColor,
                });
                const { data } = await axios.post('http://localhost:5000/predict', {
                    quantity: Number(inputData.quantity),
                    production_page: Number(inputData.production_page),
                    thickness: Number(inputData.thickness),
                    height: Number(inputData.height),
                    width: Number(inputData.width),
                    weight: Number(inputData.weight),
                    text_paper_type: mappedPaperType,
                    cover_finish_type: inputData.coverFinishType,
                    binding_type: mappedBindingType,
                    text_color: mappedTextColor,
                    shrinkwrap: Number(inputData.shrinkwrap),
                    three_hole_drill: Number(inputData.three_hole_drill),
                    perf: Number(inputData.perf),
                });
                console.log('Prediction response:', data);
                const predictedPrice = Number(data.predictedPrice.toFixed(2));
                const estimatedTime = data.estimatedFabricationTime;
                const calculatedTotal = Number(
                    (predictedPrice * Number(inputData.quantity)).toFixed(2)
                );
                setValue('predictedPrice', predictedPrice);
                setValue('estimatedFabricationTime', estimatedTime);
                setValue('totalAmount', calculatedTotal);
            } catch (error) {
                console.error('Prediction Error:', error);
                setApiError('Failed to fetch price prediction.');
                toast.current.show({
                    severity: 'error',
                    summary: 'Prediction Error',
                    detail: 'Failed to fetch price prediction.',
                    life: 3000,
                });
                setValue('predictedPrice', 0);
                setValue('estimatedFabricationTime', '');
                setValue('totalAmount', 0);
            } finally {
                setLoadingPrediction(false);
            }
        },
        [setValue]
    );

    const debouncedFetchPrediction = useCallback(
        debounce(fetchPrediction, 500),
        [fetchPrediction]
    );

    // Trigger predictions in create mode
    useEffect(() => {
        if (!isEditMode) {
            const readyForPrediction =
                quantity > 0 &&
                production_page > 0 &&
                thickness >= 0 &&
                height >= 0 &&
                width >= 0 &&
                weight >= 0 &&
                textPaperType &&
                coverFinishType &&
                bindingType &&
                textColor;

            if (readyForPrediction) {
                debouncedFetchPrediction({
                    quantity,
                    production_page,
                    thickness,
                    height,
                    width,
                    weight,
                    textPaperType,
                    coverFinishType,
                    bindingType,
                    textColor,
                    shrinkwrap,
                    three_hole_drill,
                    perf,
                });
            } else {
                // Only update if values differ to avoid infinite loop
                const currentValues = watch();
                if (currentValues.predictedPrice !== 0) setValue('predictedPrice', 0);
                if (currentValues.estimatedFabricationTime !== '') setValue('estimatedFabricationTime', '');
                if (currentValues.totalAmount !== 0) setValue('totalAmount', 0);
            }
        }
    }, [
        watch('quantity'),
        watch('production_page'),
        watch('thickness'),
        watch('height'),
        watch('width'),
        watch('weight'),
        watch('textPaperType'),
        watch('coverFinishType'),
        watch('bindingType'),
        watch('textColor'),
        watch('shrinkwrap'),
        watch('three_hole_drill'),
        watch('perf'),
        isEditMode,
        debouncedFetchPrediction,
        setValue,
        watch,
    ]);

    // Handle form submission
    const onSubmit = async (data) => {
        setApiError(null);
        setLoadingSubmit(true);
        try {
            const payload = {
                ...data,
                textPaperType: paperTypeMapping[data.textPaperType] || data.textPaperType,
                bindingType: bindingTypeMapping[data.bindingType] || data.bindingType,
                textColor: textColorMapping[data.textColor] || data.textColor,
                shrinkwrap: Number(data.shrinkwrap),
                three_hole_drill: Number(data.three_hole_drill),
                perf: Number(data.perf),
            };
            console.log('Submitting payload:', payload);
            const response = id
                ? await axios.put(`http://localhost:8081/orders/${id}`, payload)
                : await axios.post('http://localhost:8081/orders', payload);
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: id ? 'Order updated successfully!' : 'Order created successfully!',
                life: 3000,
            });
            console.log('Order response:', response.data);
            if (!id) reset();
        } catch (error) {
            console.error('Order submission error:', error);
            setApiError('Failed to submit order. Please try again.');
            toast.current.show({
                severity: 'error',
                summary: 'Submission Error',
                detail: 'Failed to submit order.',
                life: 3000,
            });
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (loadingOrder) {
        return (
            <div className="order-form-loading">
                <ProgressSpinner />
                <span>Loading order data...</span>
            </div>
        );
    }

    return (
        <div className="order-form-container">
            <Toast ref={toast} />
            <div className="order-form-card">
                <h1 className="order-form-header">
                    {id ? 'Edit Order' : 'Create New Order'}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('status')} />

                    {/* Shipping Details Section */}
                    <Panel
                        header="Shipping Details"
                        toggleable
                        className="order-form-section"
                        headerClassName="order-form-section-header"
                    >
                        <div className="order-form-grid">
                            <div className="order-form-control">
                                <label htmlFor="shippingMethod" className="order-form-label">
                                    Shipping Method
                                </label>
                                {/* Shipping Method Dropdown */}
                                <Dropdown
                                    id="shippingMethod"
                                    value={watch('shippingMethod')}
                                    onChange={(e) => setValue('shippingMethod', e.value, { shouldValidate: true })}
                                    options={[
                                        { label: 'Select...', value: '' },
                                        { label: 'FedEx', value: 'FEDEX' },
                                        { label: 'DHL', value: 'DHL' }
                                    ]}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.shippingMethod ? 'p-invalid' : ''}
                                />
                                {errors.shippingMethod && (
                                    <p className="order-form-error">
                                        {errors.shippingMethod.message}
                                    </p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="deliveryLocation" className="order-form-label">
                                    Delivery Address
                                </label>
                                <input
                                    id="deliveryLocation"
                                    type="text"
                                    placeholder="123 Main St"
                                    {...register('deliveryLocation', {
                                        required: 'Delivery address is required',
                                    })}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.deliveryLocation ? 'p-invalid' : ''}
                                />
                                {errors.deliveryLocation && (
                                    <p className="order-form-error">
                                        {errors.deliveryLocation.message}
                                    </p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="expectedDate" className="order-form-label">
                                    Expected Delivery Date
                                </label>
                                <input
                                    id="expectedDate"
                                    type="date"
                                    min={today}
                                    {...register('expectedDate', {
                                        required: 'Expected delivery date is required',
                                    })}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.expectedDate ? 'p-invalid' : ''}
                                />
                                {errors.expectedDate && (
                                    <p className="order-form-error">
                                        {errors.expectedDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Panel>

                    {/* Product Details Section */}
                    <Panel
                        header="Product Details"
                        toggleable
                        className="order-form-section"
                        headerClassName="order-form-section-header"
                    >
                        <div className="order-form-grid">
                            <div className="order-form-control">
                                <label htmlFor="quantity" className="order-form-label">
                                    Quantity
                                </label>
                                <InputNumber
                                    id="quantity"
                                    {...register('quantity', {
                                        required: 'Quantity is required',
                                        min: { value: 1, message: 'Must be at least 1' },
                                        valueAsNumber: true,
                                    })}
                                    min={1}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.quantity ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('quantity', e.value)}
                                    value={watch('quantity')}
                                />
                                {errors.quantity && (
                                    <p className="order-form-error">
                                        {errors.quantity.message}
                                    </p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="production_page" className="order-form-label">
                                    Number of Pages
                                </label>
                                <InputNumber
                                    id="production_page"
                                    {...register('production_page', {
                                        required: 'Number of pages is required',
                                        min: { value: 1, message: 'Must be at least 1' },
                                        valueAsNumber: true,
                                    })}
                                    min={1}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.production_page ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('production_page', e.value)}
                                    value={watch('production_page')}
                                />
                                {errors.production_page && (
                                    <p className="order-form-error">
                                        {errors.production_page.message}
                                    </p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="thickness" className="order-form-label">
                                    Thickness (mm)
                                    <i
                                        className="pi pi-info-circle ml-1"
                                        data-pr-tooltip="Book thickness in millimeters"
                                        data-pr-position="top"
                                    />
                                </label>
                                <Tooltip target=".pi-info-circle" />
                                <InputNumber
                                    id="thickness"
                                    {...register('thickness', {
                                        required: 'Thickness is required',
                                        min: { value: 0, message: 'Must be ≥ 0' },
                                        valueAsNumber: true,
                                    })}
                                    min={0}
                                    step={0.01}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.thickness ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('thickness', e.value)}
                                    value={watch('thickness')}
                                />
                                {errors.thickness && (
                                    <p className="order-form-error">
                                        {errors.thickness.message}
                                    </p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="height" className="order-form-label">
                                    Height (mm)
                                </label>
                                <InputNumber
                                    id="height"
                                    {...register('height', {
                                        required: 'Height is required',
                                        min: { value: 0, message: 'Must be ≥ 0' },
                                        valueAsNumber: true,
                                    })}
                                    min={0}
                                    step={0.01}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.height ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('height', e.value)}
                                    value={watch('height')}
                                />
                                {errors.height && (
                                    <p className="order-form-error">{errors.height.message}</p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="width" className="order-form-label">
                                    Width (mm)
                                </label>
                                <InputNumber
                                    id="width"
                                    {...register('width', {
                                        required: 'Width is required',
                                        min: { value: 0, message: 'Must be ≥ 0' },
                                        valueAsNumber: true,
                                    })}
                                    min={0}
                                    step={0.01}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.width ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('width', e.value)}
                                    value={watch('width')}
                                />
                                {errors.width && (
                                    <p className="order-form-error">{errors.width.message}</p>
                                )}
                            </div>

                            <div className="order-form-control">
                                <label htmlFor="weight" className="order-form-label">
                                    Weight (g)
                                </label>
                                <InputNumber
                                    id="weight"
                                    {...register('weight', {
                                        required: 'Weight is required',
                                        min: { value: 0, message: 'Must be ≥ 0' },
                                        valueAsNumber: true,
                                    })}
                                    min={0}
                                    step={0.01}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.weight ? 'p-invalid' : ''}
                                    onChange={(e) => setValue('weight', e.value)}
                                    value={watch('weight')}
                                />
                                {errors.weight && (
                                    <p className="order-form-error">{errors.weight.message}</p>
                                )}
                            </div>
                        </div>
                    </Panel>

                    {/* Finishing Options Section */}
                    <Panel
                        header="Finishing Options"
                        toggleable
                        className="order-form-section"
                        headerClassName="order-form-section-header"
                    >
                        <div className="order-form-grid">
                            {/* Text Paper Type Dropdown */}
                            <div className="order-form-control">
                                <label htmlFor="textPaperType" className="order-form-label">
                                    Text Paper Type
                                </label>
                                <Dropdown
                                    id="textPaperType"
                                    value={watch('textPaperType')}
                                    onChange={(e) => setValue('textPaperType', e.value, { shouldValidate: true })}
                                    options={[
                                        { label: 'Select...', value: '' },
                                        { label: 'Offset', value: 'OFFSET' },
                                        { label: 'Glossy', value: 'GLOSSY' },
                                        { label: 'Matte', value: 'MATTE' }
                                    ]}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.textPaperType ? 'p-invalid' : ''}
                                />
                                {errors.textPaperType && (
                                    <p className="order-form-error">
                                        {errors.textPaperType.message}
                                    </p>
                                )}
                            </div>

                            {/* Cover Finish Type Dropdown */}
                            <div className="order-form-control">
                                <label htmlFor="coverFinishType" className="order-form-label">
                                    Cover Finish Type
                                </label>
                                <Dropdown
                                    id="coverFinishType"
                                    value={watch('coverFinishType')}
                                    onChange={(e) => setValue('coverFinishType', e.value, { shouldValidate: true })}
                                    options={[
                                        { label: 'Select...', value: '' },
                                        { label: 'Layflat Gloss', value: 'LAYFLAT-GLOSS' },
                                        { label: 'Layflat Matte', value: 'LAYFLAT-MATTE' }
                                    ]}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.coverFinishType ? 'p-invalid' : ''}
                                />
                                {errors.coverFinishType && (
                                    <p className="order-form-error">
                                        {errors.coverFinishType.message}
                                    </p>
                                )}
                            </div>

                            {/* Binding Type Dropdown */}
                            <div className="order-form-control">
                                <label htmlFor="bindingType" className="order-form-label">
                                    Binding Type
                                </label>
                                <Dropdown
                                    id="bindingType"
                                    value={watch('bindingType')}
                                    onChange={(e) => setValue('bindingType', e.value, { shouldValidate: true })}
                                    options={[
                                        { label: 'Select...', value: '' },
                                        { label: 'Casebind', value: 'CASEBIND' },
                                        { label: 'Spiral', value: 'SPIRAL' },
                                        { label: 'Stapled', value: 'STAPLED' }
                                    ]}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.bindingType ? 'p-invalid' : ''}
                                />
                                {errors.bindingType && (
                                    <p className="order-form-error">
                                        {errors.bindingType.message}
                                    </p>
                                )}
                            </div>

                            {/* Text Color Dropdown */}
                            <div className="order-form-control">
                                <label htmlFor="textColor" className="order-form-label">
                                    Text Color
                                    <i
                                        className="pi pi-info-circle ml-1"
                                        data-pr-tooltip="1/1: Black & White, 4/4: Full Color"
                                        data-pr-position="top"
                                    />
                                </label>
                                <Tooltip target=".pi-info-circle" />
                                <Dropdown
                                    id="textColor"
                                    value={watch('textColor')}
                                    onChange={(e) => setValue('textColor', e.value, { shouldValidate: true })}
                                    options={[
                                        { label: 'Select...', value: '' },
                                        { label: '1/1 (Black & White)', value: '1/1' },
                                        { label: '4/4 (Full Color)', value: '4/4' }
                                    ]}
                                    disabled={loadingOrder || loadingSubmit}
                                    className={errors.textColor ? 'p-invalid' : ''}
                                />
                                {errors.textColor && (
                                    <p className="order-form-error">
                                        {errors.textColor.message}
                                    </p>
                                )}
                            </div>

                            {/* Checkbox Group */}
                            <div className="order-form-checkbox-group">
                                <div className="order-form-checkbox-item">
                                    <Checkbox
                                        id="shrinkwrap"
                                        {...register('shrinkwrap')}
                                        checked={watch('shrinkwrap')}
                                        onChange={(e) => setValue('shrinkwrap', e.checked)}
                                        disabled={loadingOrder || loadingSubmit}
                                    />
                                    <label htmlFor="shrinkwrap">Shrinkwrap</label>
                                </div>

                                <div className="order-form-checkbox-item">
                                    <Checkbox
                                        id="three_hole_drill"
                                        {...register('three_hole_drill')}
                                        checked={watch('three_hole_drill')}
                                        onChange={(e) => setValue('three_hole_drill', e.checked)}
                                        disabled={loadingOrder || loadingSubmit}
                                    />
                                    <label htmlFor="three_hole_drill">Three Hole Drill</label>
                                </div>

                                <div className="order-form-checkbox-item">
                                    <Checkbox
                                        id="perf"
                                        {...register('perf')}
                                        checked={watch('perf')}
                                        onChange={(e) => setValue('perf', e.checked)}
                                        disabled={loadingOrder || loadingSubmit}
                                    />
                                    <label htmlFor="perf">Perforation</label>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    {/* Order Summary Section */}
                    <Panel
                        header="Order Summary"
                        toggleable
                        className="order-form-section"
                        headerClassName="order-form-section-header"
                    >
                        <div className="order-form-grid">
                            <div className="order-form-control">
                                <label className="order-form-label">
                                    Total Amount
                                </label>
                                <InputNumber
                                    {...register('totalAmount', { valueAsNumber: true })}
                                    value={watch('totalAmount')}
                                    readOnly
                                    mode="currency"
                                    currency="TND"
                                />
                            </div>

                            <div className="order-form-control">
                                <label className="order-form-label">
                                    Predicted Price
                                </label>
                                <InputNumber
                                    {...register('predictedPrice', { valueAsNumber: true })}
                                    value={watch('predictedPrice')}
                                    readOnly
                                    mode="currency"
                                    currency="TND"
                                />
                            </div>

                            <div className="order-form-control">
                                <label className="order-form-label">
                                    Estimated Fabrication Time (days)
                                </label>
                                <input
                                    type="text"
                                    {...register('estimatedFabricationTime')}
                                    readOnly
                                />
                            </div>
                        </div>
                    </Panel>

                    {/* Form Actions */}
                    <div className="order-form-actions">
                        <Button
                            type="button"
                            label="Reset Form"
                            icon="pi pi-refresh"
                            className="p-button-secondary"
                            onClick={() => reset()}
                            disabled={loadingSubmit || loadingOrder || loadingPrediction}
                        />
                        <Button
                            type="submit"
                            label={loadingSubmit ? 'Submitting...' : id ? 'Update Order' : 'Create Order'}
                            icon={loadingSubmit ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                            disabled={loadingSubmit || loadingOrder || loadingPrediction}
                        />
                    </div>

                    {/* Error Alert */}
                    {apiError && (
                        <div className="order-form-error-message">
                            <strong>Error:</strong> {apiError}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default OrderForm;