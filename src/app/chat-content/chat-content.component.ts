import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../models/message.class';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User } from '../../models/user.class';
import {
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-chat-content',
  imports: [MatIconModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss',
})
export class ChatContentComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  auth = inject(Auth);
  currentUser: any = new User();
  dummyData = [
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:30',
      message: 'Hallo, wie geht’s dir?',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:31',
      message: 'Mir geht’s gut, danke! Und dir?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:32',
      message: 'Auch gut, danke der Nachfrage!',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:33',
      message: 'Was hast du heute so vor?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:35',
      message: 'Ich wollte ein bisschen lesen und später spazieren gehen.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:36',
      message: 'Klingt gut! Welches Buch liest du gerade?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-01',
      time: '14:37',
      message: 'Einen Krimi von Agatha Christie. Richtig spannend!',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-01',
      time: '14:38',
      message: 'Oh cool! Ich mag ihre Bücher auch.',
      newDay: false,
      avatar: 'avatar_1',
    },

    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:15',
      message: 'Guten Morgen! Wie hast du geschlafen?',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:17',
      message: 'Guten Morgen! Ganz gut, danke. Und du?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-02',
      time: '10:20',
      message: 'Auch gut! Ich hab ein bisschen länger geschlafen.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-02',
      time: '10:22',
      message: 'Manchmal braucht man das!',
      newDay: false,
      avatar: 'avatar_1',
    },

    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:00',
      message: 'Neuer Tag, neues Glück!',
      newDay: true,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:05',
      message: 'Genau! Was steht heute an?',
      newDay: false,
      avatar: 'avatar_1',
    },
    {
      name: 'Alice',
      date: '2025-03-03',
      time: '09:10',
      message: 'Ich muss ein paar Dinge erledigen, aber danach habe ich Zeit.',
      newDay: false,
      avatar: 'avatar_3',
    },
    {
      name: 'Bob',
      date: '2025-03-03',
      time: '09:12',
      message: 'Lass uns später treffen!',
      newDay: false,
      avatar: 'avatar_1',
    },
  ];
  loading: boolean = false;
  channels!: any;
  messages: Message[] = [];
  currentMessage: any = new Message();
  currentChannel: any;

  unsubChannel!: () => void;

  ngOnInit(): void {
    this.getMessages();
    this.setCurrentUser();
    this.getChannels();

    // this.scrollToBottom();
  }

  getChannels() {
    this.channels = [];
    this.unsubChannel = onSnapshot(
      this.getCollectionRef('channels'),
      (list) => {
        list.forEach((element) => {
          this.channels.push({
            key: element.id,
            data: element.data(),
          });
        });
      }
    );
    console.log(this.channels);
  }

  getMessages() {
    this.dummyData.forEach((m: any) => {
      this.messages.push(new Message(m));
    });
  }

  setCurrentUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        console.log('User is still logged in:', user);
      } else {
        this.currentUser = null;
        console.log('User is logged out');
      }
    });
  }

  async newMessage() {
    this.currentChannel = this.channels[0];

    if (this.currentUser) {
      const currentChannelInFirebase = doc(
        this.firestore,
        'channels',
        this.currentChannel.key
      );

      await updateDoc(currentChannelInFirebase, {
        messages: arrayUnion(this.currentMessage.toJSON()),
      })
        .then(() => (this.loading = false))
        .catch((err) => console.error(err));
    }
  }

  ngAfterViewInit(): void {
    // const chatContent = document.querySelector('.chat-content');
    // if (chatContent) {
    //   const observer = new MutationObserver(() => this.scrollToBottom());
    //   observer.observe(chatContent, { childList: true, subtree: true });
    // }
  }

  scrollToBottom(): void {
    //   setTimeout(() => {
    //     const chatContent = document.querySelector(
    //       '.chat-content'
    //     ) as HTMLElement;
    //     if (chatContent) {
    //       chatContent.scrollTop = chatContent.scrollHeight;
    //     }
    //   }, 1000);
    // }
  }

  getCollectionRef(ref: string) {
    return collection(this.firestore, ref);
  }
}
