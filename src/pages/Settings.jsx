import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/Sidebar";


export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    const savedEmail = localStorage.getItem("user_email");
    const savedPassword = localStorage.getItem("user_password");
    const savedProfilePicture = localStorage.getItem("user_profile_picture");

    if (savedName || savedEmail || savedPassword) {
      setName(savedName || "");
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setProfilePicture(savedProfilePicture);
      setIsSaved(true);
    }
  }, []);

  // Save to localStorage on save
  const handleSave = () => {
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_password", password);
    if (profilePicture) {
      localStorage.setItem("user_profile_picture", profilePicture);
    }
    setIsSaved(true);
  };

  const handleDelete = () => {
    if (confirm("You sure you wanna to delete your account?")) {
      alert("Account deleted");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_password");
      localStorage.removeItem("user_profile_picture");
      setName("");
      setEmail("");
      setPassword("");
      setProfilePicture(null);
      setIsSaved(false);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => {
    const savedName = localStorage.getItem("user_name");
    const savedEmail = localStorage.getItem("user_email");
    const savedPassword = localStorage.getItem("user_password");
    const savedProfilePicture = localStorage.getItem("user_profile_picture");

    if (savedName || savedEmail || savedPassword) {
      setName(savedName || "");
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setProfilePicture(savedProfilePicture);
      setIsSaved(true);
    }

    setLoading(false);
  }, 800);
}, []);

if (loading) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 w-32 bg-gray-400 rounded"></div>
    </div>
  );
}
  return (
    <div className="relative min-h-screen px-6 py-8 max-w-2xl mx-auto space-y-6">
      {!isSaved ? (
        <>
          <h2 className="text-2xl font-bold">Settings</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <div className="mt-2">
                <label className="text-sm">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span className="ml-2">Show password</span>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <Input
                id="profile-picture"
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
              />
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </>
      ) : (
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">WELCOME HOME!!!</h2>
          <p className="text-muted-foreground">
            Your profile information has been created.
          </p>

          {profilePicture && (
            <div className="flex justify-center">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Quick Access(Dummy buttons no use case)</h2>
            <div className="flex flex-col space-y-2 mt-2  ">
              <Button variant="outline" className="hover:bg-blue-700 hover:text-white hover:scale-105 transition" >Dashboard</Button>
              <Button variant="outline" className="hover:bg-blue-700 hover:text-white hover:scale-105 transition">Messages</Button>
              <Button variant="outline" className="hover:bg-blue-700 hover:text-white hover:scale-105 transition">Settings</Button>
            </div>
          </div>

          <Button onClick={() => setIsSaved(false)} className="mt-4">
            Edit Again
          </Button>
        </div>
      )}

      {/* Fixed Delete Button */}
      <div className="fixed bottom-6 right-6">
        <Button variant="destructive" onClick={handleDelete}>
          Delete Account
        </Button>
        
      </div>
    </div>
  );
}
