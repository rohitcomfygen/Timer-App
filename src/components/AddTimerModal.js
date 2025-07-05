// src/components/AddTimerModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTimerModal = ({ isVisible, onClose, onSave, existingCategories }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(''); // Stored as string initially
  // Initialize category to an empty string if existingCategories is empty,
  // then set a default value in a useEffect once categories are available.
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState(''); // For adding new category

  // Effect to set initial category once existingCategories are loaded or change
  React.useEffect(() => {
    if (existingCategories && existingCategories.length > 0 && category === '') {
      setCategory(existingCategories[0]);
    } else if (existingCategories && existingCategories.length === 0 && category === '') {
      // If no existing categories, default to 'Work' initially
      setCategory('Work');
    }
  }, [existingCategories, category]); // Depend on existingCategories and category

  // Prepare categories for the picker, ensuring 'Work', 'Study', 'Break' are always options,
  // and including an "Add New" option.
  const baseCategories = ['Work', 'Study', 'Break'];
  const uniqueExistingCategories = [...new Set(existingCategories)];
  const allPickerCategories = [...new Set([...baseCategories, ...uniqueExistingCategories])].sort(); // Sort for consistent order
  const pickerOptions = [...allPickerCategories, 'Add New Category...'];

  const handleSave = () => {
    const parsedDuration = parseInt(duration, 10);

    // Input validation
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a timer name.');
      return;
    }
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration in seconds (must be a positive number).');
      return;
    }

    let finalCategory = category;
    if (category === 'Add New Category...') {
      if (!newCategory.trim()) {
        Alert.alert('Validation Error', 'Please enter a name for the new category.');
        return;
      }
      finalCategory = newCategory.trim();
    } else if (!finalCategory && allPickerCategories.length === 0) {
        // Fallback for when no category is selected and no existing ones, like on first open
        finalCategory = 'Work';
    }


    // Call the onSave prop with the new timer data
    onSave({
      id: Date.now().toString(), // Simple unique ID using timestamp
      name: name.trim(),
      duration: parsedDuration,
      category: finalCategory,
      remainingTime: parsedDuration, // Initially remaining time is full duration
      status: 'paused', // Timers start in a paused state
      halfwayAlertTriggered: false, // Flag for halfway notification
    });

    // Reset form fields after saving
    setName('');
    setDuration('');
    setNewCategory('');
    setCategory(existingCategories.length > 0 ? existingCategories[0] : 'Work'); // Reset to first existing or 'Work'
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Timer</Text>

          {/* Timer Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Timer Name (e.g., Workout Timer)"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'#333'}

            maxLength={50} // Limit name length
          />

          {/* Duration Input */}
          <TextInput
            style={styles.input}
            placeholder="Duration (seconds, e.g., 600 for 10 mins)"
            keyboardType="numeric" // Only allows numeric input
            value={duration}
            onChangeText={setDuration}
            placeholderTextColor={'#333'}
            returnKeyType="done"
          />

          {/* Category Picker */}
          <Text style={styles.label}>Assign Category:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => {
                // IMPORTANT: Ensure itemValue is always treated as a string before comparison/assignment
                const selectedValue = String(itemValue);
                setCategory(selectedValue);
                if (selectedValue !== 'Add New Category...') {
                  setNewCategory(''); // Clear new category input if existing is selected
                }
              }}
            >
              {/* Ensure label and value are explicitly strings for Picker.Item */}
              {pickerOptions.map((cat, index) => (
                <Picker.Item key={String(cat) + index} label={String(cat)} value={String(cat)} />
              ))}
            </Picker>
          </View>

          {/* New Category Input (conditionally rendered) */}
          {category === 'Add New Category...' && (
            <TextInput
              style={styles.input}
              placeholder="Enter New Category Name"
              value={newCategory}
              onChangeText={setNewCategory}
              placeholderTextColor={'#333'}

              maxLength={30}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Save Timer" onPress={handleSave} color="#28a745" />
            <Button title="Cancel" onPress={onClose} color="#dc3545" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Android shadow
    width: '90%', // Make modal a bit wider
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden', // Ensures picker content respects border radius
  },
  picker: {
    width: '100%',
    height: 50, // Standard height for pickers
    color:'#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default AddTimerModal;