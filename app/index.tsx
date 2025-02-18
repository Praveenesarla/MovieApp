import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

const MovieListScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // User's search keyword
  const [triggerSearch, setTriggerSearch] = useState(false); // Flag to trigger API call
  const [searchResults, setSearchResults] = useState(null); // Store search results

  // Fetch movies when the search button is pressed (triggered by `triggerSearch`)
  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movies", searchKeyword],
    queryFn: () => fetchMovies(searchKeyword || "squid"), // Default to "squid" if no keyword
    enabled: triggerSearch,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      setTriggerSearch(true); // Trigger search when button is pressed
      setSearchResults(null); // Clear existing list to show the loading state
    }
  };

  // Handle API response
  React.useEffect(() => {
    if (movies) {
      setSearchResults(movies); // Store the fetched search results
    }
  }, [movies]);

  if (isLoading && !searchResults)
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );

  if (error)
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <Text style={styles.errorText}>Error loading movies</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie..."
          placeholderTextColor="#fff"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Show the movie list or display message if no results */}
      {searchResults?.Search && searchResults.Search.length > 0 ? (
        <FlatList
          columnWrapperStyle={{
            justifyContent:
              searchResults?.Search?.length % 2 === 0
                ? "space-around"
                : "flex-start",
          }}
          numColumns={2}
          data={searchResults.Search}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </LinearGradient>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#ffcccc",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
    height: 40,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  noResultsText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
