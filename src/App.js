import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  // ポケモンAPIのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // 最初からデータを取得するのでtrueにする
  const [loading, setLoading] = useState(true);
  // ポケモンデータを格納する変数
  const [pokemonData, setPokemonData] = useState([]);
  // 次のページの状態を保存する変数
  const [nextURL, setNextURL] = useState("");

  // 一度だけ呼び出すので、第二引数にからの配列を渡す[]
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      //次のページのポケモンのデータが入っている
      console.log(res.next);
      //次のポケモンのデータを自動で入れる
      setNextURL(res.next);
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
  // console.log(pokemonData);

  // 次のページへいくボタン
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    // 画面に呼び出すコード
    await loadPokemon(data.results);
    setLoading(false);
  };
  // 前のページへいくボタン
  const handlePrevPage = () => {};

  return (
    <>
    <Navbar />
    <div className="App">
      {/* trueかfalseでHTMLの表示を変える */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
