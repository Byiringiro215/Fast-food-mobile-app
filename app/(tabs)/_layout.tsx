import { View, Text } from 'react-native'
import React from 'react'
import { Slot,Redirect } from 'expo-router'

export default function _layout() {
    const isAuth=false
    if (!isAuth) return <Redirect href="/sign-in"/>
        
    
  return (
   <Slot/>
  )
}