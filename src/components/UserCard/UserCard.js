import { UserInfo } from '../UserInfo/UserInfo';
import { ToasterContext } from '../Toaster/Toaster';

export const UserCard = () => (
    <ToasterContext.Consumer>
        {({ onAddToast }) => (
            <div className="user-card">
                <UserInfo />

                <button
                    onClick={() =>
                        onAddToast({
                            id: 1,
                            message: 'This is my first toast'
                        })
                    }
                >
                    Add toast
                </button>
            </div>
        )}
    </ToasterContext.Consumer>
);
