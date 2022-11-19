import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import { FC } from 'react'
import styles from '../styles/Home.module.css'
import {Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js"


export const SendSolForm: FC = () => {
    const {connection } = useConnection();
    const {publicKey, sendTransaction} = useWallet() ;


    const sendSol = async(event)  => {
        console.log("stuff");
        event.preventDefault()
        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
        const recepient = new PublicKey(event.target.recipient.value);
       
        const transaction = new Transaction() ;

        const instruction = SystemProgram.transfer({
					fromPubkey: publicKey,
					toPubkey: recepient,
					lamports: LAMPORTS_PER_SOL * Number(event.target.amount.value),
				});
        transaction.add(instruction)

        const signature = await sendTransaction ( transaction,connection) ;
        console.log(
					`Explorer URL: https://explorer.solana.com/tx/${signature}?cluster=devnet`
				);
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}