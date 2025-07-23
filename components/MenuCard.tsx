import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

type LocalMenuItem = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
};

const MenuCard = ({ item }: { item: LocalMenuItem }) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-4 items-center shadow-lg min-h-[220px] relative"
      activeOpacity={0.85}
      style={Platform.OS === 'android' ? { elevation: 6, shadowColor: '#878787' } : {}}
    >
  
      <View className="absolute -top-10 z-10 bg-white rounded-full p-2 shadow-md">
        <Image
          source={{ uri: item.image_url }}
          className="w-20 h-20 rounded-full"
          resizeMode="contain"
        />
      </View>
     
      <View className="h-12" />
   
      <Text className="font-bold text-base text-dark-100 text-center mb-1" numberOfLines={1}>
        {item.name}
      </Text>
     
      <Text className="text-[15px] text-amber-500 font-semibold mb-2">
        From ${item.price}
      </Text>
      
      <Text className="text-xs text-gray-400 text-center mb-2" numberOfLines={2}>
        {item.description}
      </Text>
      <Text className="flex-row justify-start text-xs text-gray-500">⭐ {item.rating}</Text>
      <View className="flex-row justify-center gap-3">
       
        <Text className="text-xs text-gray-500">{item.calories} kcal</Text>
        <Text className="text-xs text-gray-500">{item.protein}g protein</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MenuCard