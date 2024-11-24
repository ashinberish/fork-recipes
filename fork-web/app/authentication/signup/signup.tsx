import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@remix-run/react"

export default function Signup() {
    return (
        <Card className="m-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome to Fork!</CardTitle>
                <CardDescription>
                    Sign up to explore, share, and connect through recipes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            id="name"
                            type="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Signup
                    </Button>
                    <Button variant="outline" className="w-full">
                        Signup with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        Signup with Apple
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to={"/auth/login"} className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
