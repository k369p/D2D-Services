import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send, Paperclip, ChevronLeft, Phone } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import providers from '@/data/providers';

// Mock messages
const generateMessages = (providerId: string) => {
  const messageTemplates = [
    "Hi there! I'll be arriving at your location in about 15 minutes.",
    "Just wanted to confirm your appointment for tomorrow at 10 AM.",
    "Thank you for booking our service. Do you have any specific requirements?",
    "I've reviewed the details of your booking. Everything looks good!",
    "Is there anything specific I should know before arriving?",
    "Just checking if there's parking available near your location?",
    "I've finished the job. Please let me know if you're satisfied with the service.",
    "Thank you for your payment. Looking forward to serving you again!",
  ];
  
  const messages = [];
  const now = new Date();
  
  // Generate 10-15 random messages
  for (let i = 0; i < Math.floor(Math.random() * 6) + 10; i++) {
    const isUser = Math.random() > 0.5;
    const timestamp = new Date(now.getTime() - (i * 5 * 60000));
    
    messages.push({
      id: `msg-${i}`,
      text: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
      timestamp: timestamp.toISOString(),
      isSent: true,
      isRead: true,
      isUser,
    });
  }
  
  return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(generateMessages(id as string));
  
  const flatListRef = useRef<FlatList>(null);
  
  const provider = providers.find(p => p.id === id) || providers[0];
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      text: message,
      timestamp: new Date().toISOString(),
      isSent: true,
      isRead: false,
      isUser: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate provider response after 1-3 seconds
    setTimeout(() => {
      const responseTemplates = [
        "Got it, thanks for letting me know!",
        "I understand. I'll take care of it.",
        "Thanks for the information!",
        "No problem at all. See you soon!",
        "Is there anything else you'd like to add?",
      ];
      
      const providerMessage = {
        id: `msg-${Date.now() + 1}`,
        text: responseTemplates[Math.floor(Math.random() * responseTemplates.length)],
        timestamp: new Date().toISOString(),
        isSent: true,
        isRead: true,
        isUser: false,
      };
      
      setMessages(prev => [...prev, providerMessage]);
    }, Math.random() * 2000 + 1000);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const renderItem = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessageContainer : styles.providerMessageContainer
    ]}>
      {!item.isUser && (
        <Image source={{ uri: provider.avatar }} style={styles.avatar} />
      )}
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userMessageBubble : styles.providerMessageBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.neutral[900]} />
        </TouchableOpacity>
        
        <View style={styles.providerInfo}>
          <Image source={{ uri: provider.avatar }} style={styles.providerAvatar} />
          <View>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerProfession}>{provider.profession}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.callButton}>
          <Phone size={24} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={Colors.neutral[400]}
            multiline
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              !message.trim() && styles.disabledSendButton
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? Colors.white : Colors.neutral[400]} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    padding: Spacing.xs,
  },
  providerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  providerName: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  providerProfession: {
    ...Typography.caption,
    color: Colors.neutral[600],
  },
  callButton: {
    padding: Spacing.sm,
  },
  messagesContainer: {
    padding: Spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  providerMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.xs,
  },
  messageBubble: {
    padding: Spacing.md,
    borderRadius: Spacing.borderRadiusMd,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: Colors.primary[500],
    borderBottomRightRadius: 0,
  },
  providerMessageBubble: {
    backgroundColor: Colors.neutral[100],
    borderBottomLeftRadius: 0,
  },
  messageText: {
    ...Typography.body2,
    color: Colors.neutral[800],
  },
  userMessageText: {
    color: Colors.white,
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.neutral[500],
    alignSelf: 'flex-end',
    marginTop: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  attachButton: {
    padding: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body1,
    maxHeight: 100,
    color: Colors.neutral[900],
    backgroundColor: Colors.neutral[100],
    borderRadius: Spacing.borderRadiusMd,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledSendButton: {
    backgroundColor: Colors.neutral[200],
  },
});