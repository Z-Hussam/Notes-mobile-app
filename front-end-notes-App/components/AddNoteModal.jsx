import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddNoteModal = ({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) => {
  return (
 <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ajoutez une nouvelle note</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Entrez votre note..."
            placeholderTextColor="#aaa"
            value={newNote}
            onChangeText={setNewNote}
            autoCapitalize="sentences"  // Auto-capitalize the first letter of each sentence
            autoFocus={true} // Focus on the input when the modal opens
          />
          
          <View style={styles.modalBtn}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={addNote}
            >
              <Text style={styles.saveBtnText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    elevation: 5, // Add shadow to make modal stand out on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 10, // Shadow for iOS
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  modalBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#d1d1d1',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: '#4169E1',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});



export default AddNoteModal;
