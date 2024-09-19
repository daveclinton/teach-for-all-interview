import React, { useState } from 'react';
import { PlusCircle, X, Edit2 } from 'lucide-react';
import {
  FormData,
  validateForm,
  validateField,
  formSchema,
} from '@teach-for-all/validation';

interface FieldData {
  label: string;
  value: string;
  type: string;
  isEditable: boolean;
}

export function App() {
  const [step, setStep] = useState('start');
  const [formFields, setFormFields] = useState<{ [key: string]: FieldData }>({
    name: { label: 'Name', value: '', type: 'text', isEditable: false },
    email: { label: 'Email', value: '', type: 'email', isEditable: false },
    phone: { label: 'Phone', value: '', type: 'tel', isEditable: false },
    adress: {
      label: 'Home Adress',
      value: '',
      type: 'text',
      isEditable: false,
    },
    message: {
      label: 'Message',
      value: '',
      type: 'textarea',
      isEditable: false,
    },
  });
  const [newFieldName, setNewFieldName] = useState('');
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const handleChange = (fieldName: string, value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: { ...prevFields[fieldName], value },
    }));

    // Validate the field if it's part of the schema
    if (fieldName in formSchema.shape) {
      const result = validateField(fieldName as keyof FormData, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: result?.error || null, // Check if error exists
      }));
    }
  };

  const addDynamicField = () => {
    if (
      newFieldName &&
      !Object.prototype.hasOwnProperty.call(formFields, newFieldName)
    ) {
      setFormFields((prevFields) => ({
        ...prevFields,
        [newFieldName]: {
          label: newFieldName,
          value: '',
          type: 'text',
          isEditable: true,
        },
      }));
      setNewFieldName('');
    }
  };

  const removeDynamicField = (fieldName: string) => {
    setFormFields((prevFields) => {
      const newFields = { ...prevFields };
      delete newFields[fieldName];
      return newFields;
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName as keyof FormData];
      return newErrors;
    });
  };

  const handleLabelEdit = (fieldName: string, newLabel: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: { ...prevFields[fieldName], label: newLabel },
    }));
    setEditingLabel(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Partial<FormData> = Object.entries(formFields).reduce(
      (acc, [key, field]) => {
        if (key in formSchema.shape) {
          acc[key as keyof FormData] = field.value;
        }
        return acc;
      },
      {} as Partial<FormData>
    );

    const result = validateForm(formData);
    if (result.success) {
      console.log(formFields);
      setStep('success');
    } else {
      setErrors((result.errors as Error) || {}); // Ensure correct error handling here
    }
  };

  const renderField = (fieldName: string, fieldData: FieldData) => (
    <div className="mb-5" key={fieldName}>
      <div className="flex items-center mb-2">
        {editingLabel === fieldName && fieldData.isEditable ? (
          <input
            type="text"
            value={fieldData.label}
            onChange={(e) => handleLabelEdit(fieldName, e.target.value)}
            onBlur={() => setEditingLabel(null)}
            className="text-sm font-medium text-black capitalize bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            autoFocus
          />
        ) : (
          <label
            htmlFor={fieldName}
            className="text-sm font-medium text-black capitalize"
          >
            {fieldData.label}
          </label>
        )}
        {fieldData.isEditable && (
          <button
            type="button"
            onClick={() => setEditingLabel(fieldName)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Edit2 size={16} />
          </button>
        )}
        {fieldData.isEditable && (
          <button
            type="button"
            onClick={() => removeDynamicField(fieldName)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {fieldData.type === 'textarea' ? (
        <textarea
          className={`bg-gray-50 border ${
            errors[fieldName as keyof FormData]
              ? 'border-red-500'
              : 'border-gray-300'
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          id={fieldName}
          name={fieldName}
          value={fieldData.value}
          onChange={(e) => handleChange(fieldName, e.target.value)}
          rows={4}
        />
      ) : (
        <input
          type={fieldData.type}
          className={`bg-gray-50 border ${
            errors[fieldName as keyof FormData]
              ? 'border-red-500'
              : 'border-gray-300'
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          id={fieldName}
          name={fieldName}
          value={fieldData.value}
          onChange={(e) => handleChange(fieldName, e.target.value)}
        />
      )}
      {errors[fieldName as keyof FormData] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[fieldName as keyof FormData]}
        </p>
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 'start':
        return (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center">Get Started</h1>
            <p className="text-center mt-4">
              Welcome! Please fill out our form to provide your personal details
            </p>
            <button
              type="button"
              className="mt-6 text-white bg-[#E3B5A4] hover:bg-[#E3B5A4] focus:outline-none focus:ring-2 focus:ring-red-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              onClick={() => setStep('form')}
            >
              Start Form
            </button>
          </div>
        );
      case 'form':
        return (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Fill in your details
            </h1>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="md:grid md:grid-cols-2 md:gap-6">
                {Object.entries(formFields).map(([fieldName, fieldData]) => (
                  <div
                    key={fieldName}
                    className={
                      fieldData.type === 'textarea' ? 'md:col-span-2' : ''
                    }
                  >
                    {renderField(fieldName, fieldData)}
                  </div>
                ))}
              </div>

              <div className="mb-5 flex items-center">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="Custom field name (Optional)"
                />
                <button
                  type="button"
                  onClick={addDynamicField}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <PlusCircle size={20} color="#E3B5A4" />
                </button>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#E3B5A4] hover:bg-[#E3B5A4] focus:outline-none focus:ring-2 focus:ring-red-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center">
              Submission Successful!
            </h1>
            <p className="text-center mt-4">
              Thank you for providing your details. We've received your
              information.
            </p>
            <button
              type="button"
              className="mt-6 text-white bg-[#E3B5A4] hover:bg-[#E3B5A4] focus:outline-none focus:ring-2 focus:ring-red-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              onClick={() => {
                setStep('start');
                setFormFields({
                  name: {
                    label: 'Name',
                    value: '',
                    type: 'text',
                    isEditable: false,
                  },
                  email: {
                    label: 'Email',
                    value: '',
                    type: 'email',
                    isEditable: false,
                  },
                  phone: {
                    label: 'Phone',
                    value: '',
                    type: 'tel',
                    isEditable: false,
                  },
                  message: {
                    label: 'Message',
                    value: '',
                    type: 'textarea',
                    isEditable: false,
                  },
                });
                setErrors({});
              }}
            >
              Start Over
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl space-y-8  p-8">{renderStep()}</div>
    </div>
  );
}

export default App;
