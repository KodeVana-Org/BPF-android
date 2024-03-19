// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// interface BottomSheetContentProps {
//   onClose: () => void;
//   onSkip: () => void;
// }

// const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
//   onClose,
//   onSkip,
// }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Are you sure to skip?</Text>
//       <Text style={styles.message}>
//         By logging in you can get many extra features like video conferencing,
//         update your details, get unique user ID for identity card and many more.
//       </Text>
//       <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//         <Text style={styles.closeText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={onSkip} style={styles.closeButton}>
//         <Text style={styles.closeText}>Skip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FF671F',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: 40,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#000',
//   },
//   message: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: 'gray',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 10,
//   },
//   closeText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default BottomSheetContent;
