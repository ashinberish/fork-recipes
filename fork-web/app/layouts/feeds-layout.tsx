import { AccountActions } from "@/components/account-actions/account-actions"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "@remix-run/react"
import { Banknote, ChefHat, ChevronRight, Home, LucideIcon, Search, Settings, ShoppingBasket, Sparkles, TrendingUp, UsersRound } from "lucide-react"

// TODO: Fix warning and add svg as component
import Logo from "/public/logo-light.png";
export default function FeedsLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                </header>
                <Outlet />
            </main>
        </SidebarProvider>

    )
}

const user = {
    name: 'John Doe',
    email: 'johndoe@pm.me',
    avatar: 'https://github.com/shadcn.png'
}

const mainNavItems = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Trending",
        url: "#",
        icon: TrendingUp,
    },
    {
        title: "Grocery Basket",
        url: "#",
        icon: ShoppingBasket,
    },
    {
        title: "Favorites",
        url: "#",
        icon: Sparkles
    },
    {
        title: "Friends",
        url: "#",
        icon: UsersRound,
    },
]

const masterChefItems = [
    {
        title: "My Recipes",
        url: "#",
        icon: ChefHat
    },
    {
        title: "Monetization",
        url: "#",
        icon: Banknote,
    },
    {
        title: "Master Chef Settings",
        url: "#",
        icon: Settings,
    },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        <img src={Logo} alt="logo" className="size-12"/>
                    </div>
                    <div className="grid flex-1 text-left text-base leading-tight">
                        <span className="truncate font-semibold">
                            Fork Recipes
                        </span>
                        <span className="truncate text-xs">Cook. Share. Enjoy.</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} />
                <SidebarGroup>
                    <SidebarGroupLabel>Master Chef Hub</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {masterChefItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <AccountActions user={user} />
            </SidebarFooter>
            {/* <SidebarRail /> */}
        </Sidebar>
    )
}


export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
