import React, {useState} from 'react';
import {useCreateEvent} from './useEvents';
import DateTimePicker from '@react-native-community/datetimepicker';
import useFetchUserData from '../../data/userData';
import {useQueryClient} from '@tanstack/react-query';
import moment from 'moment';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
interface Props {
  visible: boolean;
  onClose: () => void;
}

const EventModal: React.FC<Props> = ({visible, onClose}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [eventDesc, setEventDesc] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const {myServerId} = useFetchUserData();
  const {mutate: createEvent, isPending, error} = useCreateEvent();
  const queryClient = useQueryClient();
  const [time, setTime] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  // Before sending to backend
  const formattedDate = moment(date).format('MM/DD/YYYY'); // e.g. "10/05/2025"
  const formattedTimeBackend = moment(time).format('HH:mm'); // e.g. "14:30"
  const formattedTimeDisplay = moment(time).format('hh:mm A');

  const handleSubmitEvent = () => {
    // Validate inputs
    if (!eventDesc || !eventLocation) {
      Toast.show({
        type: 'error',
        text1: 'All fileds are required',
      });
      return;
    }

    // TODO: replace with real user ID from auth context
    const payload = {
      desc: eventDesc,
      location: eventLocation,
      dateOfEvent: formattedDate,
      timeOfEvent: formattedTimeBackend,
      creator: myServerId,
    };

    createEvent(payload, {
      onSuccess: data => {
        Toast.show({
          type: 'success',
          text1: 'Event created Successfully',
        });
        queryClient.invalidateQueries(['events']);
        onClose(); // Close modal
      },
      onError: (error: any) => {
        console.error('❌ Failed to create event:', error.response?.data);
        alert(error.response?.data?.message || 'Failed to create event');
      },
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📅 Add New Event</Text>

            <TextInput
              style={styles.input}
              placeholder="Event Title"
              onChangeText={setEventDesc}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={setEventLocation}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={moment(date).format('MM/DD/YYYY')}
                editable={false}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select Time"
                // value={moment(time).format('HH:mm')}
                value={formattedTimeDisplay}
                editable={false}
                placeholderTextColor="#888"
              />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => {
                  handleSubmitEvent();
                }}>
                {isPending ? (
                  <Text style={styles.saveText}>Saving..</Text>
                ) : (
                  <Text style={styles.saveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EventModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginBottom: 12,
    fontSize: 15,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
  },
  cancelText: {
    color: '#555',
    fontWeight: '500',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
