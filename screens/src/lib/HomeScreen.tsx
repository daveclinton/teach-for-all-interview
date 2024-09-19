import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  FormData,
  validateForm,
  validateField,
} from '@teach-for-all/validation';
import { Button, Snackbar, ProgressBar } from 'react-native-paper';

interface FormField {
  key: keyof FormData | string;
  label: string;
  value: string;
  error?: string;
}

const HomeScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formFields, setFormFields] = useState<FormField[]>([
    { key: 'name', label: 'Name', value: '' },
    { key: 'email', label: 'Email', value: '' },
    { key: 'phone', label: 'Phone', value: '' },
    { key: 'message', label: 'Message', value: '' },
  ]);

  const [additionalFields, setAdditionalFields] = useState<FormField[]>([]);
  const [isAddFieldModalVisible, setIsAddFieldModalVisible] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleInputChange = (
    text: string,
    index: number,
    isAdditional = false
  ): void => {
    if (isAdditional) {
      const newAdditionalFields = [...additionalFields];
      newAdditionalFields[index].value = text;
      newAdditionalFields[index].error = undefined;
      setAdditionalFields(newAdditionalFields);
    } else {
      const newFormFields = [...formFields];
      newFormFields[index].value = text;
      const { error } = validateField(
        newFormFields[index].key as keyof FormData,
        text
      );
      newFormFields[index].error = error || undefined;
      setFormFields(newFormFields);
    }
  };

  const showAddFieldModal = (): void => {
    setIsAddFieldModalVisible(true);
  };

  const hideAddFieldModal = (): void => {
    setIsAddFieldModalVisible(false);
    setNewFieldName('');
  };

  const addNewField = (): void => {
    if (newFieldName.trim() !== '') {
      const newField: FormField = {
        key: `additionalField${additionalFields.length + 1}`,
        label: newFieldName.trim(),
        value: '',
      };
      setAdditionalFields([...additionalFields, newField]);
      hideAddFieldModal();
    }
  };

  const validateFormFields = (): boolean => {
    const formData: Partial<FormData> = formFields.reduce((acc, field) => {
      acc[field.key as keyof FormData] = field.value;
      return acc;
    }, {} as Partial<FormData>);
    const { success, errors } = validateForm(formData);
    const updatedFormFields = formFields.map((field) => {
      const error = errors
        ? errors[field.key as keyof typeof errors]
        : undefined;
      return {
        ...field,
        error,
      };
    });
    setFormFields(updatedFormFields);
    const updatedAdditionalFields = additionalFields.map((field) => ({
      ...field,
      error: field.value.trim() === '' ? 'This field is required' : undefined,
    }));

    setAdditionalFields(updatedAdditionalFields);

    return success && !updatedAdditionalFields.some((field) => field.error);
  };

  const handleSubmit = () => {
    if (validateFormFields()) {
      console.log('Form is valid, submit the data');
      setStep(3);
      onToggleSnackBar();
    } else {
      console.log('Form is invalid');
    }
  };

  const renderField = (
    field: FormField,
    index: number,
    isAdditional = false
  ): React.ReactNode => (
    <View key={field.key} style={styles.fieldContainer}>
      <Text style={styles.label}>{field.label}</Text>
      <TextInput
        style={[styles.input]}
        value={field.value}
        onChangeText={(text: string) =>
          handleInputChange(text, index, isAdditional)
        }
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
      {field.error && <Text style={styles.errorText}>{field.error}</Text>}
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 1: Get Started</Text>
            <Text style={styles.stepDescription}>
              Welcome! Please fill out our form to provide your personal
              details.
            </Text>
            <Button mode="contained" onPress={() => setStep(2)}>
              Start Form
            </Button>
          </View>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.stepTitle}>Step 2: Fill Your Details</Text>
            {formFields.map((field, index) => renderField(field, index))}
            {additionalFields.map((field, index) =>
              renderField(field, index, true)
            )}
            <Button icon="plus" mode="outlined" onPress={showAddFieldModal}>
              Add New Field
            </Button>
            <Button mode="contained" onPress={handleSubmit}>
              Submit Data
            </Button>
          </View>
        );
      case 3:
        return (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Your data has been submitted successfully!
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                setStep(1);
                setFormFields(
                  formFields.map((field) => ({ ...field, value: '' }))
                );
                setAdditionalFields([]);
              }}
            >
              Start Over
            </Button>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={step / 3}
        color="#E3B5A4"
        style={styles.progressBar}
      />
      <ScrollView style={styles.scrollView}>{renderStepContent()}</ScrollView>
      <Modal
        visible={isAddFieldModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Field</Text>
            <TextInput
              style={styles.modalInput}
              value={newFieldName}
              onChangeText={setNewFieldName}
              placeholder="Enter Custom Name"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={hideAddFieldModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={addNewField}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}
      >
        You have successfully submitted your data
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 10,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginHorizontal: 12,
    paddingVertical: 40,
    gap: 10,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#E70E02',
  },
  errorText: {
    fontSize: 12,
    color: '#E70E02',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
    marginLeft: 10,
  },
  modalButtonPrimary: {
    backgroundColor: '#E3B5A4',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
