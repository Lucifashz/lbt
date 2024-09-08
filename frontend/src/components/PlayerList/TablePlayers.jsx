import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import ChallengeCard from "./ChallengeCard";
import PartnerCard from "./PartnerCard";
import {users} from "./data";
import { X, Search  } from 'lucide-react';



export default function TablePlayers() {
  const [players, setPlayers] = React.useState(users);
  const [playerLogin, setPlayerLogin] = React.useState({});
  const [token, setToken] = React.useState("");
  const [expire, setExpire] = React.useState("");
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
      refreshToken();
      getPlayers();
  }, [search]);

  // Agar axios dapat membaca cookies
  axios.defaults.withCredentials = true;

  const refreshToken = async () => {
      await axios.get("https://lbt-api.vercel.app/token")
      .then((response) => {
        setToken(response.data.accessToken);
        const decode = jwtDecode(response.data.accessToken);
        setPlayerLogin(decode);
        setExpire(decode.exp);
      }).catch((error) => {
        if (error.response) {
        }
      });
  }

  const getPlayers = async () => {
    await axios.get('https://lbt-api.vercel.app/users')
      .then((response) => { 
          setPlayers(response.data);
      })
      .catch((error) => { 
          console.log(error.response);
      })
  }

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(players.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const searchByNameOrUsername = players.filter((player) => 
      player.name.toLowerCase().includes(search.toLowerCase()) || 
      player.username.toLowerCase().includes(search.toLowerCase())
    );

    return searchByNameOrUsername.slice(start, end);
  }, [page, players]);


    const renderCell = React.useCallback((player, columnKey, login) => {
      const cellValue = player[columnKey];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              { 
                player._id !== login.partnerId && login.userId ? 
                <ChallengeCard player={player} playerLogin={login}/> :
                ""
              }

              {player._id !== login.partnerId && login.userId && player.partnerId === "" && login.partnerId === "" ? <PartnerCard player={player} playerLogin={login}/> : ""}
              <Link to={`/users/${player._id}`} className="py-2.5 px-5 text-sm font-medium rounded-lg bg-cyan-950 text-white shadow-sm hover:bg-cyan-900">
                Lihat Profil
              </Link>
              <p>{login.userId}</p>
            </div>
          );
        default:
          return cellValue;
      }
  }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

  return (
    <Table 
      aria-label="Example table with client side pagination"
      topContent={
        <div>
          <div className="relative z-0" >
              <input type="text" id="search" className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " name="search" onChange={handleSearch} value={search} required/>
              <label htmlFor="search" className={`absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 ${search ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>Cari pemain berdasarkan nama atau username</label>
                {
                    search ?
                    <button onClick={() => setSearch("")} type="button" className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                      <X className="size-3.5"/>
                    </button> :
                    <div className="absolute inset-y-0 end-0 flex items-center z-20 px-3 text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                      <Search className="size-3.5"/>
                    </div>
                }
          </div>
        </div>
      }
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="username">USERNAME</TableColumn>
        <TableColumn key="email">EMAIL</TableColumn>
        <TableColumn key="actions">ACTION</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          item._id !== playerLogin.userId ?
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey, playerLogin)}</TableCell>}
          </TableRow> :  ""
        )}
      </TableBody>
    </Table>
  )
}
