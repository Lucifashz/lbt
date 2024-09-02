import React from "react";
import { Link } from "react-router-dom";
import {Button, Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import { Sword, Swords, Target } from 'lucide-react';
import Player from "./Player";


export default function MatchSingle(props) {

const date = new Date(props.match.matchDate)

const matchDate =  new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Asia/Jakarta',
   }).format(date)
// Sat Aug 17 2024 13:43:17 GMT+0700 (Indochina Time)
// Saturday, August 17, 2024 at 1:39:00 PM GMT+7


   return (
      <Card className="p-3 overflow-scroll md:overflow-hidden border-r-0">
         <Tabs aria-label="Options" color="primary"
            classNames={{
               tab: "border-1 border-cyan-950 bg-white",
               tabContent: "text-cyan-950",
               tabList: "bg-white",
               base:"justify-center"
            }}
         >

         {
            props.match.matchOne ? 
            <Tab 
               key="pertama" 
               title={
                  <div className="flex items-center space-x-2">
                     <span>Babak Pertama</span>
                     <Sword className="size-5"/>
                  </div>
               }
            >
               <CardBody>
                  <Divider/>
                  <div className="flex mt-4 justify-between">
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {props.match.matchType === "single" ? "Pertandingan Tunggal" : ""}
                     </Button>
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {matchDate}
                     </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-xl font-bold">Wasit</p>
                     <Player id={props.match.refereeId} />
                  </div>   
                  <div className="flex justify-between">
                     <div className="flex flex-col gap-5 items-start">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Pertama</p>
                        </div>
                        <Player id={props.match.matchOne.teamOne.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim pertama: </p>
                           <div className="flex gap-5">
                              {
                                 props.handleScoreMacthOneTeamOne ? 
                                 props.handleScoreMacthOneTeamOne :
                                 <p className="text-2xl font-semibold">{props.match.matchOne.teamOne.score}</p> 
                              }
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-center grow items-center">
                        <h1 className="text-6xl font-extrabold text-cyan-950">VS</h1>
                     </div>
                     <div className="flex flex-col gap-5 items-end">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Kedua</p>
                        </div>
                        <Player direction="right" id={props.match.matchOne.teamTwo.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim kedua: </p>
                           <div className="flex gap-5">
                              {
                                 props.handleScoreMacthOneTeamTwo ? 
                                 props.handleScoreMacthOneTeamTwo :
                                 <p className="text-2xl font-semibold">{props.match.matchOne.teamTwo.score}</p> 
                              }
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex mt-4 mb-4 justify-between items-center">
                     <p className="text-cyan-950 font-bold">
                        Pemenang Babak Pertama: {props.match.matchOne.winner === "teamOne" ? "Tim Pertama" : props.match.matchOne.winner === "teamTwo" ? "Tim Kedua" : ""}
                     </p>
                     <div className="flex gap-5 grow justify-center mr-20">
                        {
                           props.handleSubmitMacthOne ? 
                           props.handleSubmitMacthOne :
                           ""
                        }
                     </div>
                     <Button className={`${props.match.matchOne.status === "unfinished" ? "border-1 border-cyan-950 text-cyan-950 bg-white" : "bg-cyan-950 text-white"}`}>
                        {props.match.matchOne.status === "unfinished" ? "Belum selesai" : "Selesai"}
                     </Button>
                  </div>
                  <Divider/>
                  <div className="flex justify-center mt-5">
                     <Link className="py-3 px-4 bg-blue-600 text-white rounded-xl" to={props.link}>{props.linkName}</Link>
                  </div>
               </CardBody> 
            </Tab> 
               : ""
         }

         {
            props.match.matchTwo ? 
            <Tab key="kedua" 
               title={
                  <div className="flex items-center space-x-2">
                     <span>Babak Kedua</span>
                     <Swords className="size-5"/>
                  </div>
               }
            >
               <CardBody>
                  <Divider/>
                  <div className="flex mt-4 justify-between">
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {props.match.matchType === "single" ? "Pertandingan Tunggal" : ""}
                     </Button>
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {matchDate}
                     </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-xl font-bold">Wasit</p>
                     <Player id={props.match.refereeId} />
                  </div>   
                  <div className="flex justify-between">
                     <div className="flex flex-col gap-5 items-start">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Pertama</p>
                        </div>
                        <Player id={props.match.matchTwo.teamOne.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim pertama: </p>
                              {
                                 props.handleScoreMacthTwoTeamOne ? 
                                 props.handleScoreMacthTwoTeamOne :
                                 <p className="text-2xl font-semibold">{props.match.matchTwo.teamOne.score}</p> 
                              }
                        </div>
                     </div>
                     <div className="flex flex-col justify-center">
                        <h1 className="text-6xl font-extrabold text-cyan-950">VS</h1>
                     </div>
                     <div className="flex flex-col gap-5 items-end">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Kedua</p>
                        </div>
                        <Player direction="right" id={props.match.matchTwo.teamTwo.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim kedua: </p>
                              {
                                 props.handleScoreMacthTwoTeamTwo ? 
                                 props.handleScoreMacthTwoTeamTwo :
                                 <p className="text-2xl font-semibold">{props.match.matchTwo.teamTwo.score}</p> 
                              }
                        </div>
                     </div>
                  </div>
                  <div className="flex mt-4 mb-4 justify-between items-center">
                     <p className="text-cyan-950 font-bold">
                        Pemenang Babak Pertama: {props.match.matchTwo.winner === "teamOne" ? "Tim Pertama" : props.match.matchTwo.winner === "teamTwo" ? "Tim Kedua" : ""}
                     </p>
                     <div className="flex gap-5 grow justify-center mr-20">
                        {
                           props.handleSubmitMacthTwo ? 
                           props.handleSubmitMacthTwo :
                           ""
                        }
                     </div>
                     <Button className={`${props.match.matchTwo.status === "unfinished" ? "border-1 border-cyan-950 text-cyan-950 bg-white" : "bg-cyan-950 text-white"}`}>
                        {props.match.matchTwo.status === "unfinished" ? "Belum selesai" : "Selesai"}
                     </Button>
                  </div>
                  <Divider/>
                  <div className="flex justify-center mt-5">
                     <Link className="py-3 px-4 bg-blue-600 text-white rounded-xl" to={props.link}>{props.linkName}</Link>
                  </div>
               </CardBody> 
            </Tab>
               : ""
         }

         {
            props.match.matchThree ? 
            <Tab key="ketiga" 
               title={
                  <div className="flex items-center space-x-2">
                     <span>Babak Ketiga</span>
                     <Target className="size-5"/>
                  </div>
               }
            >
               <CardBody>
                  <Divider/>
                  <div className="flex mt-4 justify-between">
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {props.match.matchType === "single" ? "Pertandingan Tunggal" : ""}
                     </Button>
                     <Button className="border-1 border-cyan-950 text-cyan-950 bg-white">
                        {matchDate}
                     </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-xl font-bold">Wasit</p>
                     <Player id={props.match.refereeId} />
                  </div>   
                  <div className="flex justify-between">
                     <div className="flex flex-col gap-5 items-start">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Pertama</p>
                        </div>
                        <Player id={props.match.matchThree.teamOne.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim pertama: </p>
                              {
                                 props.handleScoreMacthThreeTeamOne ? 
                                 props.handleScoreMacthThreeTeamOne :
                                 <p className="text-2xl font-semibold">{props.match.matchThree.teamOne.score}</p> 
                              }
                        </div>
                     </div>
                     <div className="flex flex-col justify-center">
                        <h1 className="text-6xl font-extrabold text-cyan-950">VS</h1>
                     </div>
                     <div className="flex flex-col gap-5 items-end">
                        <div className="mt-5 flex gap-10">
                           <p className="text-lg font-semibold">Tim Kedua</p>
                        </div>
                        <Player direction="right" id={props.match.matchThree.teamTwo.playerOneId}/>
                        <div className="my-5 flex flex-col items-center">
                           <p>Skor tim kedua: </p>
                              {
                                 props.handleScoreMacthThreeTeamTwo ? 
                                 props.handleScoreMacthThreeTeamTwo :
                                 <p className="text-2xl font-semibold">{props.match.matchThree.teamTwo.score}</p> 
                              }
                        </div>
                     </div>
                  </div>
                  <div className="flex mt-4 mb-4 justify-between items-center">
                     <p className="text-cyan-950 font-bold">
                        Pemenang Babak Pertama: {props.match.matchThree.winner === "teamOne" ? "Tim Pertama" : props.match.matchThree.winner === "teamTwo" ? "Tim Kedua" : ""}
                     </p>
                     <div className="flex gap-5 grow justify-center mr-20">
                        {
                           props.handleSubmitMacthThree ? 
                           props.handleSubmitMacthThree :
                           ""
                        }
                     </div>
                     <Button className={`${props.match.matchThree.status === "unfinished" ? "border-1 border-cyan-950 text-cyan-950 bg-white" : "bg-cyan-950 text-white"}`}>
                        {props.match.matchThree.status === "unfinished" ? "Belum selesai" : "Selesai"}
                     </Button>
                  </div>
                  <Divider/>
                  <div className="flex justify-center mt-5">
                     <Link className="py-3 px-4 bg-blue-600 text-white rounded-xl" to={props.link}>{props.linkName}</Link>
                  </div>
               </CardBody> 
            </Tab>
               : ""
         }

         </Tabs>
      </Card>
   )

}
