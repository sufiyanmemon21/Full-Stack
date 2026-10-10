import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  decrement, increment, reset } from "../Redux/slice/counterslice";



export default function Contact() {
  const counter= useSelector((state)=>state.counter.value)
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-80 shadow-xl rounded-2xl">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          <h1 className="text-2xl font-bold">Counter</h1>

          <div className="text-6xl font-bold text-primary">
           {counter}
          </div>

          <div className="flex gap-4">
            <Button size="icon" variant="outline" onClick={()=>dispatch(decrement())} >
              <Minus className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={()=>dispatch(reset())}>
             <X /> Reset
            </Button>

            <Button size="icon" onClick={()=>dispatch(increment())}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}