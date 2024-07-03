import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ContactCard from "./ContactCard";
import usePaginatedData from "@/hooks/contacts/usePaginatedData";

const ContactsList = ({ search }: { search?: string }) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = usePaginatedData(search);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="large" color="blue" />;
    }
    return null;
  };

  if (isLoading && !isRefreshing) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (isError) {
    return (
      <View>
        <Text>Error: {JSON.stringify(error.message)}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={data?.pages.flatMap((page) => page.data) || []}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({ item }) => <ContactCard contact={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ContactsList;
