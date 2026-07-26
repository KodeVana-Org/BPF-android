import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ModelsParamList } from '../../navigator/ModelNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { useQueryClient } from '@tanstack/react-query';
// Import your update API function here:
// import { update_post, get_single_post } from '../../api/app_data_apis';
import { get_single_post, update_post_titles } from '../../api/app_data_apis';

type EditPostRouteProp = RouteProp<ModelsParamList, 'EditPost'>;

const EditPostScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
    const route = useRoute<EditPostRouteProp>();
    const { postId } = route.params;
    const queryClient = useQueryClient();

    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Fetch current post details to pre-fill input
    useEffect(() => {
        const fetchPostDetails = async () => {
            setLoading(true);
            try {
                // Pass an object with the postId property instead of a raw string
                const res = await get_single_post({ postId: postId.toString() });
                console.log("RES", res);
                setComment(res?.post.postTitles || res?.post?.postTitles || '');
            } catch (error) {
                Toast.show({ type: 'error', text1: 'Failed to load post details' });
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetails();
    }, [postId]);

    const handleUpdate = async () => {
        if (!comment.trim()) {
            Toast.show({ type: 'error', text1: 'Post content cannot be empty' });
            return;
        }

        setSubmitting(true);
        try {
            // Replace with your actual backend update API call:
            const result = await update_post_titles(postId, { postComment: comment });

            if (result?.status === 200) {
                Toast.show({ type: 'success', text1: 'Post updated successfully' });
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                navigation.goBack();
            } else {
                Toast.show({ type: 'error', text1: 'Update failed' });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Network error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#046A38" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Edit Caption</Text>
            <TextInput
                style={styles.input}
                multiline
                placeholder="What's on your mind?"
                placeholderTextColor="#65676B"
                value={comment}
                onChangeText={setComment}
            />

            <TouchableOpacity
                style={[styles.saveButton, submitting && { opacity: 0.7 }]}
                onPress={handleUpdate}
                disabled={submitting}>
                {submitting ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0F2F5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#65676B',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4E6EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#050505',
        minHeight: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#046A38',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditPostScreen;