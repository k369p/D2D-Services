import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import SearchBar from '@/components/ui/SearchBar';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import providers from '@/data/providers';

// Mock chat data
const chats = providers.map(provider => ({
  id: provider.id,
  user: {
    id: provider.id,
    name: provider.name,
    avatar: provider.avatar,
    profession: provider.profession,
  },
  lastMessage: {
    text: `Hello, I'll be arriving for the service at the scheduled time. Please let me know if you need anything specific.`,
    timestamp: '10:30 AM',
    isRead: Math.random() > 0.5,
    isSent: Math.random() > 0.3,
  },
}));

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChatPress = (id: string) => {
    router.push(`/messages/${id}`);
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Messages" />
      
      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search messages..."
        />
        
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.chatItem}
              onPress={() => handleChatPress(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                <View style={[
                  styles.statusIndicator, 
                  { backgroundColor: item.lastMessage.isSent ? Colors.success[500] : Colors.neutral[400] }
                ]} />
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.userName}>{item.user.name}</Text>
                  <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
                </View>
                
                <Text style={styles.profession}>{item.user.profession}</Text>
                <Text 
                  style={[styles.messagePreview, !item.lastMessage.isRead && styles.unreadMessage]}
                  numberOfLines={1}
                >
                  {item.lastMessage.text}
                </Text>
              </View>
              
              {!item.lastMessage.isRead && <View style={styles.unreadIndicator} />}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages found</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
  },
  listContainer: {
    paddingBottom: Spacing.xxl,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chatContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
  profession: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginBottom: Spacing.xs,
  },
  messagePreview: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  unreadMessage: {
    color: Colors.neutral[900],
    fontFamily: Typography.fontFamily.medium,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary[500],
    marginLeft: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});