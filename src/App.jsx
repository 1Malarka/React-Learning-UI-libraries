import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChooseTextChild, ChooseRemoveParent, ChooseTextParent,DropdownMenuContentItems } from "./components/ui/Short"
import { useTaskStore } from "./Store"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"

function App() {
  const tasks = useTaskStore((state) => state.tasks)
  const useStore = create(persist((set) => ({
  theme: "light",   // theme (fr ong???)
    toggleTheme: () =>
      set((state) => ({
      theme: state.theme === "light" ? "dark" : "light"
    })),
})))

function ThemeToggle() {
const theme = useStore((state) => state.theme)
const toggleTheme = useStore((state) => state.toggleTheme)

  if (theme == "light") {
    document.body.className = "lightTheme"
  } else {
    document.body.className = "blackTheme"
  }

  return (
    <button className="ThemeButton" onClick={toggleTheme}>{theme}</button>
  )
}

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
            <CardTitle className="mb-1">Reminder app v1.0.2 </CardTitle>
            <CardDescription>Your tasks below </CardDescription>
            </div>
            <ThemeToggle />
            
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
                  <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="" className="ml-1">
                          Remove Section
                        </Button>
                      </DialogTrigger>
                  
                    <ChooseRemoveParent parentId={task.id}/>
                  </Dialog>
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
