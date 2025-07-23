import CartButton from '@/components/CartButton'
import Filter from '@/components/Filter'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import useLocalData, { getLocalCategories, getLocalMenu } from '@/lib/useLocalData'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const search = () => {
  const {category,query}=useLocalSearchParams<{query:string,category:string}>()
  // const { data, refetch, loading } = useAppwrite({fn: getMenu,params: {category,query, limit: '6'}});
  // const {data:categories}=useAppwrite({fn:getCategories})
  const { data, refetch, loading } = useLocalData({fn: getLocalMenu,params: {category,query}});
  const {data:categories}=useLocalData({fn:getLocalCategories})

  // console.log(data)
  useEffect(()=>{
    refetch({category,query})
  },[category,query])
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList 
      data={data}
       renderItem={({item, index}) => {
       
return(
  <View className='flex-1 min-w-[150px] max-w-[200px]'>
    <MenuCard item={item} />
  </View>
)
      }}
      keyExtractor={item=>item.id}
      numColumns={2}
      columnWrapperClassName='gap-7'
      contentContainerClassName='gap-7 px-5 pb-32'
      ListHeaderComponent={() => (
        <View className="my-5 gap-5">
          <View className="flex-between flex-row w-full">
            <View className="flex-start">
              <Text className="small-bold uppercase text-primary">Search</Text>
              <View className="flex-start flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
              </View>
            </View>
            <CartButton />
          </View>
          <SearchBar/>
          <Filter categories={categories || []}/>
        </View>
      )}
      ListEmptyComponent={() => !loading ? <Text>No results</Text> : null}
      />
      
    </SafeAreaView>
  )
}

export default search