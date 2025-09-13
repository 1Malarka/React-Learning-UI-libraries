import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuContentItems } from "./components/ui/Short"
import { ChooseTextParent } from "./components/ui/Short"
import { ChooseTextChild } from "./components/ui/Short"
import { useTaskStore } from "./Store"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"

function App() {
  const tasks = useTaskStore((state) => state.tasks)
  const addParent = useTaskStore((state) => state.addParent)
  const removeParent = useTaskStore((state) => state.removeParent)
  const addChild = useTaskStore((state) => state.addChild)
  const editChild = useTaskStore((state) => state.editChild)
  

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Reminder app v1.0.1</CardTitle>
            <CardDescription>Your tasks below</CardDescription>
          </CardHeader>

          <CardContent>
            <Accordion type="single" collapsible>
              {tasks.map((task) => (
                <AccordionItem key={task.id} value={task.id}>
                  <AccordionTrigger>{task.title}</AccordionTrigger>
                  <AccordionContent>
                    {task.children.map((child) => (
                      <div key={child.id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Checkbox />
                          <p>{child.text}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">⋮</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContentItems parentId={task.id} childId={child.id} childText={child.text}  />
                        </DropdownMenu>
                      </div>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                      <Button size="sm" variant="outline" >
                        Add sub-task
                      </Button>
                      </DialogTrigger>
 
                      <ChooseTextChild parentId={task.id}/>
                    </Dialog>
                    <Button
                      size="sm"
                      variant=""
                      className="mt-2 ml-2"
                      onClick={() => removeParent(task.id)}
                    >
                      Remove Section
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>

          <CardFooter className="justify-around">
            <Dialog>
             <DialogTrigger asChild>
               <Button size="sm" variant="outline" >
                 Add Task Section
               </Button>
             </DialogTrigger>

             <ChooseTextParent />
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
