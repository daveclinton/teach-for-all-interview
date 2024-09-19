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

interface FormField {
  key: string;
  label: string;
  value: string;
}

const HomeScreen: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { key: 'name', label: 'Name', value: '' },
    { key: 'email', label: 'Email', value: '' },
    { key: 'phone', label: 'Phone', value: '' },
    { key: 'message', label: 'Message', value: '' },
  ]);

  const [additionalFields, setAdditionalFields] = useState<FormField[]>([]);
  const [isAddFieldModalVisible, setIsAddFieldModalVisible] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');

  const handleInputChange = (
    text: string,
    index: number,
    isAdditional = false
  ): void => {
    if (isAdditional) {
      const newAdditionalFields = [...additionalFields];
      newAdditionalFields[index].value = text;
      setAdditionalFields(newAdditionalFields);
    } else {
      const newFormFields = [...formFields];
      newFormFields[index].value = text;
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

  const renderField = (
    field: FormField,
    index: number,
    isAdditional = false
  ): React.ReactNode => (
    <View key={field.key} style={styles.fieldContainer}>
      <Text style={styles.label}>{field.label}</Text>
      <TextInput
        style={styles.input}
        value={field.value}
        onChangeText={(text: string) =>
          handleInputChange(text, index, isAdditional)
        }
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {formFields.map((field, index) => renderField(field, index))}
          {additionalFields.map((field, index) =>
            renderField(field, index, true)
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={showAddFieldModal}>
        <Text style={styles.fabIcon}>Add New Field</Text>
      </TouchableOpacity>

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
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  formContainer: {
    marginHorizontal: 12,
    paddingBottom: 80,
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
  fab: {
    position: 'absolute',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#E3B5A4',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 18,
    color: 'white',
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
});

export default HomeScreen;
