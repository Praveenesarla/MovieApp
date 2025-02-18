import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { shortlistMovie, removeMovie } from "../redux/movieSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector((state) => state.movies.shortlisted);
  const isShortlisted = shortlistedMovies.some(
    (m) => m.imdbID === movie.imdbID
  );

  return (
    <View style={styles.card}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={1}>
        {movie.Title}
      </Text>
      <Pressable
        style={[
          styles.button,
          isShortlisted ? styles.removeButton : styles.shortlistButton,
        ]}
        onPress={() =>
          dispatch(isShortlisted ? removeMovie(movie) : shortlistMovie(movie))
        }
      >
        <Text style={styles.buttonText}>
          {isShortlisted ? "Remove" : "Shortlist"}
        </Text>
      </Pressable>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 280,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    margin: 10,
  },
  poster: {
    width: 140,
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  button: {
    width: "90%",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  shortlistButton: {
    backgroundColor: "#007BFF",
  },
  removeButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
