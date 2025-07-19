import tkinter as tk
from tkinter import scrolledtext
import sqlite3
# Database setup
conn = sqlite3.connect('chat.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS messages (username TEXT, message TEXT)''')
conn.commit()
# Function to save message to database
def save_message(username, message):
    c.execute("INSERT INTO messages (username, message) VALUES (?, ?)", (username, message))
    conn.commit()
# Function to load messages from database
def load_messages():
    c.execute("SELECT * FROM messages")
    return c.fetchall()
# GUI setup
class ChatApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Чат")
        self.chat_area = scrolledtext.ScrolledText(root, state='disabled')
        self.chat_area.pack(pady=10)
        self.username_entry = tk.Entry(root, width=30)
        self.username_entry.pack(pady=5)
        self.username_entry.insert(0, "Никнейм")
        self.message_entry = tk.Entry(root, width=50)
        self.message_entry.pack(pady=5)
        self.send_button = tk.Button(root, text="Отправить", command=self.send_message)
        self.send_button.pack(pady=5)
        self.load_chat()
    def send_message(self):
        username = self.username_entry.get()
        message = self.message_entry.get()
        if username and message:
            save_message(username, message)
            self.message_entry.delete(0, tk.END)
            self.load_chat()

    def load_chat(self):
        self.chat_area.config(state='normal')
        self.chat_area.delete(1.0, tk.END)
        messages = load_messages()
        for msg in messages:
            self.chat_area.insert(tk.END, f"{msg[0]}: {msg[1]}\n")
        self.chat_area.config(state='disabled')
if __name__ == "__main__":
    root = tk.Tk()
    app = ChatApp(root)
    root.mainloop()
