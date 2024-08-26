import React from "react";
import MatchSingle from "./MatchSingle";
import MatchDouble from "./MatchDouble";
import TableMatchList from "./TableMatchList";

export default function Matches(props) {

   const sortAscending = props.matches.sort((matcheA, matcheB) => new Date(matcheB.matchDate) - new Date(matcheA.matchDate));
   console.log(sortAscending);
   

   const matchesElement = sortAscending.map((match, i) => (
      match.matchType === "single" ? 
      <MatchSingle key={i} match={match} link={`/matches/${match._id}`} linkName="Lihat pertandingan"/> : 
      <MatchDouble key={i} match={match} link={`/matches/${match._id}`} linkName="Lihat pertandingan"/>
   ));

   return (
      <>
         <TableMatchList>
            {matchesElement}
         </TableMatchList>
      </>
   )
}
