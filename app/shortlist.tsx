import React from "react";
import { View, Text, FlatList, Image, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../redux/movieSlice.js";

const Shortlist = () => {
  const shortlistedMovies = useSelector((state) => state.movies.shortlisted);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shortlisted Movies</Text>
      {shortlistedMovies.length === 0 ? (
        <Text style={styles.emptyText}>No movies shortlisted</Text>
      ) : (
        <FlatList
          data={shortlistedMovies}
          keyExtractor={(item) => item.imdbID.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieCard}>
              <Image source={{ uri: item.Poster }} style={styles.poster} />
              <View style={styles.info}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <Button
                  title="Remove"
                  color="red"
                  onPress={() => dispatch(removeMovie(item))}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Shortlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
  movieCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
    marginTop: 10,
    gap: 30,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
