import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const numColumns = windowWidth > 900 ? 4 : windowWidth > 600 ? 3 : 2;

  const fetchCharacters = async (reset = false) => {
    try {
      if (reset) {
        setPage(1);
        setCharacters([]);
        setLoading(true);
      }

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${
          reset ? 1 : page
        }&name=${search}`
      );

      if (!response.ok) throw new Error("Erro ao buscar dados.");

      const data = await response.json();

      setCharacters((prev) =>
        reset ? data.results : [...prev, ...data.results]
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCharacters(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (page === 1) return;
    fetchCharacters(false);
  }, [page]);

  const loadMore = () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    setPage((prev) => prev + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCharacters(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Espécie: {item.species}</Text>
      <Text>ID: {item.id}</Text>
    </View>
  );

  if (loading && characters.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando personagens...</Text>
      </View>
    );
  }

  if (error && characters.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchCharacters(true)}
        >
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar personagem..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchCharacters(true)}
      >
        <Text style={styles.buttonText}>Recarregar lista</Text>
      </TouchableOpacity>

      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        numColumns={numColumns}
        key={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },

  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    cursor: "pointer",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },

  input: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: "#FFF",
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    outlineStyle: "none",
  },
});
