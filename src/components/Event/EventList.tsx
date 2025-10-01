import React, {useState} from 'react';
import {Modal} from 'react-native';
import {useDeleteEvent} from './useEvents';
import moment from 'moment';

import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useEvents} from './useEvents';
import LocationPinIcon from './location';
import CalendarIcon from './calender';
import Add from '../../assets/icons/add.png';
import EventModal from './EventModal';
import useFetchUserData from '../../data/userData';
import Dele from '../../assets/icons/delete.png';

const EventFlatList = () => {
  const {data, error, isError} = useEvents();
  const [modalVisible, setModalVisible] = useState(false);
  const {superAdmin} = useFetchUserData();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {mutate: deleteEvent, isPending} = useDeleteEvent();

  const handleDeletePress = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!selectedId) return;
    deleteEvent(selectedId);
    Toast.show({
      type: 'success',
      text1: 'Event Deleted Successfully',
    });

    // Close confirmation
    setShowConfirm(false);
    setSelectedId(null);
  };

  // Inside your render or component:
  const formatTimeToAmPm = (time24: string): string => {
    return moment(time24, 'HH:mm').format('hh:mm A');
  };

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Failed to load events: {error?.message ?? 'Unknown error'}
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No events available.</Text>
      </View>
    );
  }

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {/* Title + Delete Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.desc}</Text>
        {superAdmin ? (
          <TouchableOpacity onPress={() => handleDeletePress(item._id)}>
            <Image
              source={Dele}
              style={styles.deleteIcon}
              resizeMode="cover" // optional: helps with image cropping
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Location Row */}
      <View style={styles.metaRow}>
        <LocationPinIcon width={18} height={16} style={{marginTop: 1}} />
        <Text style={styles.metaText}>{item.location}</Text>
      </View>

      {/* Date Row */}
      <View style={styles.metaRow}>
        <CalendarIcon width={18} height={16} style={{marginTop: 1}} />
        <Text
          style={[styles.metaText, item.isEventOngoing && styles.ongoingText]}>
          {new Date(item.dateOfEvent).toDateString()} at{' '}
          {formatTimeToAmPm(item.timeOfEvent)}{' '}
          {item.isEventOngoing ? '               [ Ongoing ]' : ''}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.confirmModalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity onPress={() => setShowConfirm(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.deleteBtn}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {superAdmin ? (
        <>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({pressed}) => [
              styles.plus,
              pressed && styles.pressed, // Add background or other styles when pressed
            ]}>
            <Image source={Add} style={{width: 90, height: 90}} />
          </Pressable>
          <EventModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </>
      ) : null}
    </>
  );
};

export default EventFlatList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 9,
  },

  deleteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20, // half of width/height to make it round
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  plus: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // paddingVertical: 18,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 20,

    // Centering
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#e6e6e6', // light gray when pressed
  },
  banner: {
    width: '100%',
    height: 180,
  },
  details: {
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  meta: {
    fontSize: 17,
    color: '#555',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 5,
  },
  metaText: {
    fontSize: 16,
    // color: '#333',
    marginLeft: 6,
    paddingTop: 3,

    color: 'green',
    fontWeight: 'bold',
  },

  //conform box

  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },

  confirmText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    padding: 10,
    color: '#555',
    fontWeight: '500',
  },

  deleteBtn: {
    padding: 10,
    color: 'red',
    fontWeight: '600',
  },

  ongoingText: {
    color: 'green',
    fontWeight: 'bold',
  },
});
