import Search from "antd/es/input/Search";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getlistAll } from "../../api/album/album_api";
import Loading from "../../components/loading/Loading";
import { UserTopRight } from "../../styles/adminstyle/guardianlist";
import {
  AlbumList,
  AlbumTopBar,
  AlbumWrap,
  SearchBar,
} from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import { GreenBtn } from "../../styles/ui/buttons";
const host = `http://192.168.0.144:5224/pic/album/`;
const ReadAllAlbum = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalAlbumCount, setTotalAlbumCount] = useState(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  const loadImages = useCallback(async () => {
    // 로딩 중이거나 모든 데이터가 로드되었다면 함수를 종료합니다.
    if (
      loading ||
      (totalAlbumCount !== null && items.length >= totalAlbumCount)
    ) {
      return;
    }

    setLoading(true);
    getlistAll({
      page,
      successFn: data => {
        setTotalAlbumCount(data.albumCnt);
        setItems(prevItems => [...prevItems, ...data.list]);
        setPage(prevPage => prevPage + 1);
        setHasMore(data.list.length > 0);
        setLoading(false);
      },
      failFn: message => {
        console.error(message);
        setLoading(false);
        setHasMore(false);
      },
      errorFn: data => {
        console.error(data);
        setLoading(false);
        setHasMore(false);
      },
    });
  }, [loading, totalAlbumCount, items, page]);

  // Observer 설정
  const handleObserver = useCallback(
    entities => {
      const target = entities[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadImages();
      }
    },
    [loadImages, hasMore, loading],
  );

  // Observer 인스턴스 생성
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px", // 하단 감지 영역을 위로 올립니다.
      threshold: 0.5, // 필요에 따라 threshold 조정
    };
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  // 컴포넌트 마운트 시 첫 페이지 데이터 로드
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <AlbumWrap paddingTop={40} width={100} height={100}>
      {/* 메인 콘텐츠 상단 바 컴포넌트 */}
      <AlbumTopBar>
        <PageTitle>활동앨범</PageTitle>
        <SearchBar>
          <UserTopRight>
            <Search
              placeholder="제목을 입력하세요."
              style={{
                width: 300,
              }}
              size={"large"}
              allowClear
              onSearch={value => console.log(value)}
            />
            <GreenBtn onClick={e => navigate("write")}>글쓰기</GreenBtn>
          </UserTopRight>
        </SearchBar>
      </AlbumTopBar>
      <AlbumList>
        {items.map(item => (
          <Link
            ref={loaderRef}
            key={item.ialbum}
            to={`/album/details/${item.ialbum}`}
          >
            <ul className="image-grid">
              <li className="image-item">
                <img
                  height={400}
                  src={`${host}${item.ialbum}/${item.albumPic}`}
                  alt={item.albumTitle}
                />
              </li>
              <p>{item.albumTitle}</p>
            </ul>
          </Link>
        ))}
        {loading && <Loading className="loading" />}
      </AlbumList>
    </AlbumWrap>
  );
};

export default ReadAllAlbum;
