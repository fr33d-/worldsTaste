import React, { Component } from 'react';
import { Navigationbar } from '../../components/Navigationbar';

type BlogProps = {};

type BlogState = {};

export class Blog extends Component<BlogProps, BlogState> {
    public render() {
        return (
            <>
                <Navigationbar />
                <div className="container">
                    <div className="col-12">
                        <h1>Blog</h1>
                        <p>Nothing here</p>
                    </div>
                </div>
            </>
        );
    }
}
