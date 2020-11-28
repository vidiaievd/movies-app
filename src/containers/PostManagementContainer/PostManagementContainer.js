import { Component as ReactComponent } from 'react';

const DEFAULT_POSTS = [
    {
        id: 1,
        title: 'Welcome to our App!',
        text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Architecto ipsa sint officiis, amet rem nobis tenetur, totam
        aspernatur, quo quisquam nisi repellendus unde! Consequuntur
        sequi aliquam facilis sapiente, voluptas commodi at explicabo
        illum vitae eum rerum neque, voluptates voluptatibus iure?
        Voluptatem possimus molestias harum odit accusantium voluptate
        ducimus earum ea?`,
        amount: 23
    },
    {
        id: 2,
        title: 'Hello World!',
        text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo provident eos maiores placeat officia praesentium, corporis, ab saepe repellat molestias neque magnam modi aliquid! Nam, doloremque unde. Ullam sapiente voluptatum debitis. Est fugit labore, nisi aliquid incidunt nulla repellat dolorem!`,
        amount: 45
    },
    {
        id: 3,
        title: 'Last post',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, asperiores dolorem architecto, numquam minima id iusto beatae reprehenderit doloribus est tempore? Voluptas, vitae rerum sint earum accusantium nobis tempore eaque similique dolor tempora voluptatem quibusdam magni enim velit qui incidunt labore. Aliquam ex neque beatae vero repudiandae autem voluptatibus temporibus necessitatibus sunt, fugiat deleniti officiis ut assumenda animi incidunt debitis.`,
        amount: 100
    }
];

export class PostManagementContainer extends ReactComponent {
    state = {
        posts: DEFAULT_POSTS,
        postsAmount: 3,
        showPosts: true,
        login: '',
        showLogin: false
    };

    handleRemovePost = postId => {
        const { posts } = this.state;

        const filteredPosts = posts.filter(p => p.id !== postId);

        this.setState({
            posts: filteredPosts,
            postsAmount: filteredPosts.length
        });
    };

    handleTogglePosts = () => {
        this.setState(
            prevState => ({
                showPosts: !prevState.showPosts
            })
            // () => console.log('Updated!')
        );
    };

    handleChangeInput = e => {
        this.setState({ login: e.target.value });
    };

    handleToggleLogin = () => {
        this.setState(prevState => ({
            login: this.inputRef.current.value,
            showLogin: !prevState.showLogin
        }));
    };

    render() {
        const { as: Component, children, ...other } = this.props;

        // return children({
        //     ...this.state,
        //     onTogglePosts: this.handleTogglePosts,
        //     onToggleLogin: this.handleToggleLogin,
        //     onRemovePost: this.handleRemovePost,
        //     ...other
        // });

        return (
            <Component
                {...this.state}
                onTogglePosts={this.handleTogglePosts}
                onToggleLogin={this.handleToggleLogin}
                onRemovePost={this.handleRemovePost}
                {...other}
            />
        );
    }
}
