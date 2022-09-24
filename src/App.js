import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  // ポケモンAPIのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // 最初からデータを取得するのでtrueにする
  const [loading, setLoading] = useState(true);
  // ポケモンデータを格納する変数
  const [pokemonData, setPokemonData] = useState([]);

  // 一度だけ呼び出すので、第二引数にからの配列を渡す[]
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setLoading(false);
    };
    // 関数を呼ぶ
    fetchPokemonData();
  },[]);

  const loadPokemon = async (data)  => {
    // 全てのデータを取得する
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecode = getPokemon(pokemon.url);
        return pokemonRecode;
      })
    );
    setPokemonData(_pokemonData);
  };
  // useStateのデータをログに表示
  console.log(pokemonData);

  return (
    <div className="App">
      {/* trueかfalseでHTMLの表示を変える */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
