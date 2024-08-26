import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ChallengeCard from "./ChallengeCard";
import PartnerCard from "./PartnerCard";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {columns, users} from "./data";
import {capitalize} from "./utils";

const rowPages = [
  {key: "5", label: "5"},
  {key: "10", label: "10"},
  {key: "15", label: "15"},
  {key: "20", label: "20"},
  {key: "25", label: "25"},
  {key: "30", label: "30"},
];


const INITIAL_VISIBLE_COLUMNS = ["name", "username", "email", "match total", "win", "lose", "actions"];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const [players, setPlayers] = React.useState(users);
  const [playerLogin, setPlayerLogin] = React.useState({});

  const [token, setToken] = React.useState("");
  const [expire, setExpire] = React.useState("");

  React.useEffect(() => {
      refreshToken();
      getPlayers();
  }, []);

  // Agar axios dapat membaca cookies
  axios.defaults.withCredentials = true;

  const refreshToken = async () => {
      await axios.get("http://localhost:3000/token")
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
    await axios.get('http://localhost:3000/users')
      .then((response) => { 
          setPlayers(response.data);
      })
      .catch((error) => { 
          console.log(error.response);
      })
  }

  const pages = Math.ceil(players.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...players];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((player) =>
        player.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        player.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [players, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((player, columnKey, login) => {
    const cellValue = player[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "full", size: "sm", src: player.avatar}}
            classNames={{
              description: "text-default-500 text-sm",
            }}
            description={player.username}
            name={cellValue}
          >
            {player.email}
          </User>
        );
      case "username":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-default-500">{player.username}</p>
          </div>
        );
      case "match total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-default-500">100</p>
          </div>
        );
      case "win - lose":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-default-500">15 - 5</p>
          </div>
        );
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
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name or username..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {playerLogin.userId ? players.length - 1 : players.length} users</span>
          <Select
          items={rowPages}
          label="Rows per page:"
          placeholder="5"
          className="max-w-xs"
          size="sm"
          onChange={onRowsPerPageChange}
        >
          {(rowPage) => <SelectItem>{rowPage.label}</SelectItem>}
        </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    players.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" :
            column.uid === "match total" ? "center" : 
            column.uid === "win - lose" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          item._id !== playerLogin.userId ?
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey, playerLogin)}</TableCell>}
          </TableRow>
          : ""
        )}
      </TableBody>
    </Table>
  );
}
