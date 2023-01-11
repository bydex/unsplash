import { Component } from "react";
import { LogoIcon } from "../assets/icons/LogoIcon";
import { HeartIcon } from "../assets/icons/HeartIcon";
import { ClockIcon } from "../assets/icons/ClockIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <header className="header sticky top-0 z-30 bg-dark py-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="header__logo logo">
            <LogoIcon />
          </Link>
          <div className="header__controls flex gap-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <SearchIcon /> Поиск
            </Link>
            <Link to="/favourites" className="inline-flex items-center gap-2">
              <HeartIcon /> Избранное
            </Link>
            <Link to="/history" className="inline-flex items-center gap-2">
              <ClockIcon /> История поиска
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
