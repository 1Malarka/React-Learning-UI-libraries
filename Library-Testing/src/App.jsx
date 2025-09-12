import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"


function App() {
const [isActive, setIsActive] = useState(false);

  const toggleActive =() => {
    setIsActive(!isActive)
  }


  return (
    <>
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
         <CardHeader>
           <CardTitle>Reminder app v1.0.0</CardTitle>
           <CardDescription>Your tasks below</CardDescription>
         </CardHeader>
         <CardContent className="justify-between flex items-center">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="AccordTrigger">Hello! I'm task №1</AccordionTrigger>
                    <AccordionContent className="flex justify-around flex-col">
                      <li>
                      Go to school
                      </li>
                      <li>
                      Work some
                      </li>
                      <li>
                      Go to GYM
                      </li>
                      <Button size="sm" variant="outline" className=" mt-2 ">
                        Change Text
                      </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="AccordTrigger">Hello! I'm task №2</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
         </CardContent>
         <CardFooter className="justify-around">
            <Button size="sm" variant="outline" className="justify-self-end">
              Add Task
            </Button>
            <Button size="sm" variant="outline" className="justify-self-end">
              Remove Task
            </Button>
         </CardFooter>  
        </Card>
      </div>
    </div>
    </>
  )
}

export default App
