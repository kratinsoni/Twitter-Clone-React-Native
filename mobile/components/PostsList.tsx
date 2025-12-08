import { View, Text } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const PostsList = () => {
    const { currentUser } = useCurrentUser();

    console.log('Current User in PostsList:', currentUser);
  return (
    <View>
      <Text>PostsList</Text>
    </View>
  )
}

export default PostsList