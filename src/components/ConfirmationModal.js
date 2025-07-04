// src/components/ConfirmationModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ConfirmationModal = ({ isVisible, onClose, message }) => {
  return (
    <Modal
      animationType="fade" // Smooth fade in/out animation
      transparent={true} // Allows background to show through
      visible={isVisible} // Controls modal visibility
      onRequestClose={onClose} // Called when the user taps outside or presses back button (Android)
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Button title="Got it!" onPress={onClose} color="#007bff" />
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
    backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay for modal
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Android shadow
    width: '80%', // Modal width
    maxWidth: 350,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
});

export default ConfirmationModal;   